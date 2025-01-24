import React, { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import axios from "axios";
import { useSelector } from 'react-redux';
import AdminGlobalFiltering from "../../AdminTablesUIs/AdminGlobalFiltering";
import AdminTableHeaderGroups from "../../AdminTablesUIs/AdminTableHeaderGroups";
import AdminTablesPagination from "../../AdminTablesUIs/AdminTablesPagination";
import "./ProjectsTable.css" ;

const ProjectsTable = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects/", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        console.log(" projects:", response.data );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
     // console.log(" projects:", error);
    if (userInfo?.token) {
      fetchProjects();
    }
  }, [userInfo]);

  const columns = useMemo(
    () => [

      { Header: "Titre du projet", accessor: "title" },
      { Header: "Chef du projet", accessor: "creatorId.username" },
      {
        Header: "Membres",
        accessor: "users",
        Cell: ({ value }) => (
          <ul>
            {value.map((user, index) => (
              <li key={index}>
                <strong>Membre:</strong> {user.user.username} {/* Assuming 'user' is an ID or name */}
                <br />
                <strong>Tasks :</strong>{" "}
                {user.tasksAssigned.length > 0 ? (
                  <ul>
                    {user.tasksAssigned.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                ) : (
                  "0 taches"
                )}
              </li>
            ))}
          </ul>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => projects, [projects]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
     state,
    setGlobalFilter,
    //state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
     // initialState: { pageSize: 10 }, // Set your initial page size here
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <div className="bookings-table_filteringAndSearch">
        <div>
          <AdminGlobalFiltering
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
        </div>
      </div>
      <table className="admin-table" {...getTableProps()}>
        <AdminTableHeaderGroups headerGroups={headerGroups} isBooking={true} />
        <tbody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={idx}>
                {row.cells.map((cell, cellIdx) => {
                  let className = "";
                  if (cell.column.id === "status") {
                    if (cell.value === "Waitlist") {
                      className = "text-primary";
                    } else if (cell.value === "Tentative") {
                      className = "text-muted";
                    } else if (cell.value === "Confirmed") {
                      className = "text-success";
                    } else {
                      className = "text-danger";
                    }
                  }
                  return (
                    <td className={className} {...cell.getCellProps()} key={cellIdx}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AdminTablesPagination
        nextPage={nextPage}
        previousPage={previousPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={[10, 15, 20]}
      />
    </>
  );
};

export default ProjectsTable;

import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import axios from "axios";
import { toast } from "react-hot-toast";
import {  useSelector } from 'react-redux';
import {

  Button,IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AdminGlobalFiltering from "../../AdminTablesUIs/AdminGlobalFiltering";
import AdminTableHeaderGroups from "../../AdminTablesUIs/AdminTableHeaderGroups";
import AdminTablesPagination from "../../AdminTablesUIs/AdminTablesPagination";
import AdminModalUI from "../../AdminModalUI/AdminModalUI";
import defaultPictureUrl   from '../../../assets/user.png';

const UsersTable = (props) => {
  const [users, setUsers] = useState([]);
  const {  userInfo } = useSelector((state) => state.userLogin);

  const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),


  },
}));


  const classes = useStyles();

 useEffect(() => {
 const fetchUsers = async () => {
  try {
    const response = await axios.get("/api/users/all", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log("users:",response.data);
    // Filter out the admin user
    const filteredUsers = response.data.filter(user => !user.isAdmin);
    setUsers(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
fetchUsers();
}, [users]);



  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

       const NotDeletedUsers = response.data.filter(user => !user.userId);
       setUsers(NotDeletedUsers);
       toast.success(" User Deleted  Successfully");

    } catch (error) {
    toast.error("Error deleting user");
      console.error('Error deleting user:', error);

    }
  };


  const columns = useMemo(
    () => [

        {
        Header: "photo de profil",
        accessor: "profilePicture",
        Cell: ({ value }) => {

          return value ? (
            <img src={value} alt="Profile" style={{ width: 50, height: 50 }} />
          ) : (
            <img src={defaultPictureUrl} alt="Default Profile" style={{ width: 50, height: 50 }} />
          );
        },
      },
      { Header: "Nom", accessor: "username" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "isAgent", Cell: ({ value }) => (value ? "Responsable" : "Technicien") },
      {
        Header: "Actions",
        accessor: "_id",

        Cell: ({ value }) => (

        <Button  variant="outlined"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        style={{ color: "white" }}
        onClick={() => deleteUser(value)} style={{ color: "red" }}>
            Bloquer
          </Button>
        ),
      },
    ],
    []

  );

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
  } = useTable(
    {
      columns,
      data: users,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <AdminGlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} className="admin-table">
        <AdminTableHeaderGroups headerGroups={headerGroups} isBooking={false} />
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => props.openModal("agentsTableModal")}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
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
        pageSizeOptions={[5, 10]}
      />

    </>
  );
};

export default UsersTable;

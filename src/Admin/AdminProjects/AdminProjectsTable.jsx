import React from "react";
import ProjectsTable from "./AdminProjectsTableParts/ProjectsTable";
import "../AdminTablesUIs/AdminTableUIs.css";

const AdminProjectsTable = () => {
  return (
    <div
      style={{ backgroundColor: "var(--clr-secondary-000)", height: "140vh" }}
      className="col-xxl-10 col-xl-9 col-lg-9 ms-auto p-4 pt-lg-5 mt-lg-2"
    >
      <h4
        className="mb-0 fw-bolder text-dark fs-2 mb-3"
        style={{
          backgroundColor: "var(--clr-secondary-000)",
          textAlign: "center",
        }}
      >
        Liste des Projets
      </h4>
      <ProjectsTable />
    </div>
  );
};

export default AdminProjectsTable;

import React from "react";
import UsersTable from "./AdminUsersTableParts/UsersTable";
import "../AdminTablesUIs/AdminTableUIs.css";

const AdminUsersTable = (props) => {
  return (
    <div
      style={{ backgroundColor: "var(--clr-secondary-000)", height: "120vh" }}
      className="col-xxl-10 col-xl-9 col-lg-9 ms-auto p-2 p-4 pt-lg-5 mt-lg-2"
    >
      <h4
        className="mb-0 fw-bolder text-dark fs-2 mb-3"
        style={{
          backgroundColor: "var(--clr-secondary-000)",
          textAlign: "center",
        }}
      >
        Liste des Utilisateurs
      </h4>
      <UsersTable
        showModal={props.showModal}
        openModal={props.openModal}
        closeModal={props.closeModal}
      />
    </div>
  );
};

export default AdminUsersTable;

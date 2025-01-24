import React from "react";
import { Link , useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import Image from "../../assets/images/user-avatar/user1.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faListAlt, faUserTie, faToolbox, faCogs, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

//import useAuth from "../../../hooks/useAuth";

const AdminSidebar = (props) => {
  //const { accessData } = useAuth();
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
     dispatch(logout());
     history.push("/"); // Redirect to home page after logout
   };
  const navItems = [
   {
     label: "Tableau de Bords",
     icon: faHome,
     onClick: () => props.startShowing("Dashboard"),
   },
   {
     label: "Projets",
     icon: faListAlt,
     onClick: () => props.startShowing("Projects"),
   },
   {
     label: "Utilisateurs",
     icon: faUserTie,
     onClick: () => props.startShowing("Agents"),
   },

 ];

 const navItemsBottom = [
  {
     label: "Parametres",
     icon: faCogs,
     onClick: () => props.startShowing("Settings"),
   },
   {
     label: "Informations du Compte",
     icon: faUserCircle,
     onClick: () => props.startShowing("Account Information"),
   },
   {
     label: "Deconnexion",
     icon: faSignOutAlt,
     onClick:  handleLogout,
   },
 ];

  return (
    <>
      <div className="col-xxl-2 col-xl-3 col-lg-3  admin-sidebar fixed-top">
        <Link
          to="/"
          className="navbar-brand text-white d-block mx-auto text-center py-3 mb-4 text-uppercase admin-bottom__border"
        >
          Bonjour, Admin
        </Link>
        <div className="admin-bottom__border pb-3">
          <img
            src={Image}
            alt="pogi"
            width="50"
            className="rounded-circle me-3"
          />
          <span className="text-decoration-none text-white">
          Bienvenue dans votre Espace

          </span>
        </div>
        <ul className="navbar-nav flex-column mt-5">
          {navItems.map((navItem) => (
            <li key={navItem.label} className="nav-item">
              <a
                href="#"
                className="nav-link text-white p-3 mb-2 admin-sidebar__panel"
                onClick={() => navItem.onClick(props)}
              >
                <FontAwesomeIcon icon={navItem.icon} className="text-light fa-lg me-3" />
                {navItem.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="admin-sidebar__settingsAndAccount mb-3">
          {navItemsBottom.map((navItem) => (
            <a
              key={navItem.label}
              href="#"
              className="nav-link text-light p-2 mb-0"
              onClick={() => navItem.onClick(props)}
            >
              <FontAwesomeIcon icon={navItem.icon} className="text-light fa-lg me-3" />

              {navItem.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;

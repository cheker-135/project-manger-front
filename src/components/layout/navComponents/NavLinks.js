import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';

import { CircularProgress } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

import NewProjectModal from './NewProjectModal';
import UserNav from './UserNav';
import ProjectSelect from './projectSelect/ProjectSelect';
import ProjectItems from './ProjectItems';
import NavItem from './NavItem';

const NavLinks = ({ navExpanded, mobile, closeNav }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const isAgent = userInfo && userInfo.isAgent;
  return (
    <>
      {loading && (!mobile || (mobile && navExpanded)) ? (
        <CircularProgress style={{ margin: '5vh auto 0 auto' }} />
      ) : userInfo ? (
        <>
          <UserNav navExpanded={navExpanded} mobile={mobile} />
          <ProjectItems navExpanded={navExpanded} mobile={mobile} />
          <ProjectSelect navExpanded={navExpanded} mobile={mobile} />
          <NavItem
            link={'/boards'}
            action={closeNav}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'Boards'}
            Icon={DashboardIcon}
          />
           {isAgent && (
          <NavItem
            action={() => setModalOpen(true)}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'Nouveau Projet'}
            Icon={CreateNewFolderIcon}
          />
          )}
          <NavItem
            action={() => {
              dispatch(logout());
              closeNav && closeNav();
            }}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'Se deconnecter'}
            Icon={ExitToAppIcon}
          />
    {isAgent && (
          <NewProjectModal
            open={modalOpen}
            handleClose={() => {
              setModalOpen(false);
              mobile && closeNav();
            }}
          />
            )}
        </>
      ) : (
        <>
          <NavItem
            link={'/'}
            action={closeNav}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'Acceuil'}
            Icon={DashboardIcon}
          />
          <NavItem
            link={'/signin'}
            action={closeNav}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'Se connecter'}
            Icon={LockOpenIcon}
          />
          <NavItem
            link={'/register'}
            action={closeNav}
            navExpanded={navExpanded}
            mobile={mobile}
            title={'S identifier'}
            Icon={VpnKeyIcon}
          />
        </>
      )}
    </>
  );
};

export default NavLinks;

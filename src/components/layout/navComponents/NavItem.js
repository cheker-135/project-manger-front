import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles, MenuItem, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  iconMargin: {
    margin: '10px 0',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
  },
  menuItemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontFamily: 'Segoe UI',
      fontSize: 18,
      fontWeight: 200,
    '&:hover': { //rgba(0,0,0,0.15)
      background: '#00bcd4',
      borderRadius:10 ,
        textColor: 'black',
        fontSize:20,
        transform: 'translate(2px, 5px) scale(1)',
        fontWeight: 250,

    },
  },
  hiddenMenu: {
    visibility: 'hidden',
  },
  menuText: {
    margin: '10px 0 10px 15px',
  },
}));

const NavItem = ({ link, title, action, Icon, navExpanded, mobile }) => {
  const classes = useStyles();
  return link ? (
    <NavLink
      to={link}
      onClick={action && action}
      className={`${classes.navLink} ${
        !navExpanded && mobile && classes.hiddenMenu
      }`}
    >
      <Tooltip placement='right' title={!navExpanded ? title : ''}>
        <MenuItem className={navExpanded && classes.menuItemContainer}>
          <Icon className={classes.iconMargin} />
          <p
            className={classes.menuText}
            style={{ display: !navExpanded && 'none' }}
          >
            {title}
          </p>
        </MenuItem>
      </Tooltip>
    </NavLink>
  ) : (
    <Tooltip placement='right' title={!navExpanded ? title : ''}>
      <MenuItem
        className={
          navExpanded ? classes.menuItemContainer : mobile && classes.hiddenMenu
        }
        onClick={action}
      >
        <Icon className={classes.iconMargin} />
        <p
          className={classes.menuText}
          style={{ display: !navExpanded && 'none' }}
        >
          {title}
        </p>
      </MenuItem>
    </Tooltip>
  );
};

export default NavItem;

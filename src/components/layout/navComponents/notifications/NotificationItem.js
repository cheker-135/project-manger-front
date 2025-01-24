import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  Button,
  Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import {
  NewComment,
  NewComments,
  NewToDoList,
  NewToDoLists,
  ProjectInvitation,
  RemovedFromProject,
  TaskArchived,
  TaskAssignment,
  TaskDeleted,
  TaskRestored,
  ToDoListDeleted,
  ToDoListsDeleted,
  TaskTitleUpdate,
  TaskDeadlineUpdate,
  TaskDescriptionUpdate,
  ProjectDeleted,
  PermissionsUpdated,
  TaskLabelsUpdate,
  RemovedFromTask,
} from './NotificationConstants';

import moment from 'moment';

const useStyles = makeStyles(() => ({
  notificationContainer: {
    borderBottom: '1px solid #e8e2e2',
    padding: 10,
  },
  notificationFlexContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  notificationMessage: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: 10,
  },
  notificationCaption: {
    color: '#979a9a',
    fontSize: '0.71rem',
  },
  notificationDescription: {
    maxWidth: 371,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  btnActions: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    background: '#f0f8ffd6',
    height: '100%',
    alignItems: 'center',
    '& button': {
      backgroundColor: '#f0f8ff',
      '&:nth-child(1)': {
        marginRight: 10,
      },
      '&:nth-child(1):hover': {
        background: '#ffedf1',
      },
      '&:nth-child(2):hover': {
        background: '#d5f9ff',
      },
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 3,
    right: 3,
    padding: 5,
  },
}));

const NotificationItem = ({
  projectNotificationHandle,
  discardNotificationHandle,
  actionHandle,
  notificationsIndexes,
  notification,
  index,
}) => {
  const classes = useStyles();
  const descriptionRef = useRef();
  const elementOverflowed =
    descriptionRef.current &&
    descriptionRef.current.scrollWidth > descriptionRef.current.clientWidth;

  const description =
    (notification.type === ProjectInvitation && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' vous a invite pour rejoindre le  projet: '}
        <strong>{`"${notification.project.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskAssignment && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' vous a assigne a la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === RemovedFromTask && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' vous a retire de la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === RemovedFromProject && (
      <span>
        <strong>{notification.sender.username}</strong>

        {notification.description.split(':')[0]}
        <strong>{notification.description.split(':')[1]}</strong>
      </span>
    )) ||
    (notification.type === TaskArchived && (
      <span>
        <strong>{notification.sender.username}</strong>
        {'a archive la tache : '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskDeleted && (
      <span>
        <strong>{notification.sender.username}</strong>
        {'a supprime la tache : '}
        <strong>{`"${notification.description}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskRestored && (
      <span>
        <strong>{notification.sender.username}</strong>
        {'a restaure la tache : '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === NewToDoList && (
      <span>
        <strong>{notification.sender.username}</strong>
        {'a ajoute nouvelle liste A faire a la tache  : '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === NewToDoLists && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a ajoute nouvelles listes A faire a la tache : '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === ToDoListDeleted && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a supprime liste A faire de la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === ToDoListsDeleted && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a supprime les listes A faire de la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === NewComment && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a commente la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === NewComments && (
      <span>
        Nouveaux commentaires concernant la  tache:
        <strong>{` "${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskTitleUpdate && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a mis a jour le  titre du  tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskDeadlineUpdate && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a mis a jour le  deadline du tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskDescriptionUpdate && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a mis a jour la description dans la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === TaskLabelsUpdate && (
      <span>
        <strong>{notification.sender.username}</strong>
        {'  a mis a jour les labels dans la tache: '}
        <strong>{`"${notification.task.title}"`}</strong>
      </span>
    )) ||
    (notification.type === ProjectDeleted && (
      <span>
        <strong>{notification.sender.username}</strong>
        {' a juste'}
        {notification.description.split(':')[0]}
        <strong>{notification.description.split(':')[1]}</strong>
      </span>
    )) ||
    (notification.type === PermissionsUpdated && (
      <span>
        <strong>{notification.sender.username}</strong>
        {notification.description === '1'
          ? 'a pris votre role administrateur dans le projet:'
          : ' vous a assigne les permissions administrateur dans le projet:'}
        <strong>{` "${notification.project.title}"`}</strong>
      </span>
    ));
  return (
    <div style={{ position: 'relative' }}>
      <MenuItem
        className={classes.notificationContainer}
        onClick={() => projectNotificationHandle(index)}
        disabled={notificationsIndexes.indexOf(index) !== -1}
      >
        <div className={classes.notificationFlexContainer}>
          <Link to={`/profile/${notification.senderId}`}>
            <Avatar
              className={classes.avatar}
              src={notification.sender.profilePicture}
            />
          </Link>
          <div className={classes.notificationMessage}>
            <Typography
              variant='caption'
              className={classes.notificationCaption}
              style={{ textTransform: 'capitalize' }}
            >
              {notification.type}
            </Typography>
            <Tooltip title={elementOverflowed ? description : ''}>
              <Typography
                variant='body2'
                className={classes.notificationDescription}
                ref={descriptionRef}
              >
                {description}
              </Typography>
            </Tooltip>
            <Typography
              variant='caption'
              className={classes.notificationCaption}
            >
              {moment(notification.createdAt).fromNow()}
            </Typography>
          </div>
        </div>
      </MenuItem>
      {notificationsIndexes.indexOf(index) !== -1 && (
        <div className={classes.btnActions}>
          <Button
            color='secondary'
            onClick={() => discardNotificationHandle(notification._id, index)}
            style={{
              marginRight: notification.type === RemovedFromProject && 0,
            }}
          >
            Supprimer
          </Button>
          {![RemovedFromProject, ProjectDeleted, TaskDeleted].includes(
            notification.type
          ) && notification.type === ProjectInvitation &&  (
            <Button
              variant='outlined'
              color='primary'
              onClick={() => actionHandle(notification)}
            >
               Joindre
            </Button>
          )}
          <IconButton
            color='secondary'
            className={classes.closeBtn}
            onClick={() => projectNotificationHandle(index)}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;

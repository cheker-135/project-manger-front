import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  projectTaskArchive,
  projectTaskDelete,
} from '../../../../../redux/actions/projectActions';

import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import SideButton from './SideButton';
import DeleteMenu from '../../../shared/DeleteMenu';

const Archive = ({ task, listIndex, taskIndex }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const archiveHandle = () => {
    dispatch(
      projectTaskArchive(task._id, task.projectId, taskIndex, listIndex, () =>
        setAnchorEl(null)
      )
    );
  };
  const deleteTaskHandle = () => {
    dispatch(projectTaskDelete(task._id, taskIndex, () => setAnchorEl(null)));
  };

  return (
    <>
      {task.archived ? (
        <SideButton
          icon={<HighlightOffIcon />}
          text={'Supprimer'}
          secondary
          clickHandle={(e) => setAnchorEl(e.currentTarget)}
        />
      ) : (
        <SideButton
          icon={<DeleteIcon />}
          text={'Archive'}
          clickHandle={archiveHandle}
        />
      )}
      <DeleteMenu
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        headerTitle='Delete task?'
        deleteHandle={deleteTaskHandle}
        text={'la suppression d une tache est irreversible, etes-vous sur?'}
      />
    </>
  );
};

export default Archive;

import React, { useState } from 'react';

import { Menu, MenuItem } from '@material-ui/core';

import DeleteMenu from '../../../shared/DeleteMenu';
import MenuHeader from '../../../shared/MenuHeader';

const ToDoMenu = ({
  deleteListHandle,
  tasksVisibilityHandle,
  tasksFinished,
  tasksHidden,
  anchorEl,
  closeHandle,
  disabled,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleClose = () => {
    setDeleteOpen(false);
    closeHandle();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transitionDuration={0}
    >
      <div style={{ outline: 'none' }}>
        {deleteOpen ? (
          <DeleteMenu
            Header={
              <MenuHeader
                title='Supprimer la liste A-Faire?'
                goBackHandle={() => setDeleteOpen(false)}
                handleClose={handleClose}
              />
            }
            deleteHandle={deleteListHandle}
            text='La suppression de la liste A-Faire est irreversible.'
          />
        ) : (
          <>
            <MenuHeader title='To-Do List Actions' handleClose={handleClose} />
            <div style={{ width: 270, padding: '6px 9px 0 9px' }}>
              <MenuItem
                style={{ marginTop: 5 }}
                onClick={() => tasksVisibilityHandle(!tasksHidden)}
              >
                {tasksHidden
                  ? tasksFinished === 0
                    ? 'Afficher les taches Finies'
                    : `Afficher les taches Finies (${tasksFinished})`
                  : 'Masquer les tâches terminées'}
              </MenuItem>
              <MenuItem onClick={() => setDeleteOpen(true)} disabled={disabled}>
                Supprimer
              </MenuItem>
            </div>
          </>
        )}
      </div>
    </Menu>
  );
};

export default ToDoMenu;

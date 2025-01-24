import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../../../redux/actions/projectActions';

import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Header from './Header';
import Loader from '../../../../Loader';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    '& button': {
      marginRight: 40,
    },
  },
}));

const DeleteProject = ({ projectId }) => {
  const dispatch = useDispatch(projectId);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const deleteHandle = () => {
    setLoading(true);
    dispatch(deleteProject(projectId, () => setLoading(false)));
  };

  return (
    <div className={classes.container}>
      <Header icon={DeleteIcon} title='Delete Project' />
      <Button
        variant='outlined'
        color='secondary'
        onClick={() => setOpen(true)}
      >
        Supprimer
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
      >
        <DialogTitle>Suppression Projet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes-vous sur de vouloir supprimer ce project ,cette action est definitive
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button
            onClick={deleteHandle}
            variant='contained'
            color='secondary'
            disabled={loading}
          >
            Supprimer
            {loading && <Loader button />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProject;

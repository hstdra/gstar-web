import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import Switch from 'react-switch';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Fade,
  Modal,
  IconButton,
  Button,
  Grid,
  TextField,
  CardHeader,
  Divider
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { Link as RouterLink } from 'react-router-dom';
import {
  saveFolder,
  deleteFolder,
  autoSyncFolder
} from 'services/core.service';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'space-between'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const FoldersTable = props => {
  const { className, folders, setFolders, ...rest } = props;
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState({});

  useEffect(() => {
    return () => {};
  }, [folders]);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleAutoSync = folderId => {
    const folder = folders.find(folder => folder.id === folderId);
    folder.autoSync = !folder.autoSync;

    saveFolder(folder).then(() => {
      autoSyncFolder(folder.id).then(() => {
        setFolders([...folders]);
      });
    });
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChange = (event, field, value) => {
    event.preventDefault();

    setFolder({
      ...folder,
      [field]: value
    });
  };

  const handleOpenModal = folder => {
    setFolder(folder ? folder : { localPath: null, drivePath: null });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (folder.localPath && folder.drivePath) {
      saveFolder(folder).then(newFolder => {
        if (!folder.id) {
          setFolders([...folders, newFolder]);
        } else {
          setFolders([
            ...folders.filter(folder => folder.id !== newFolder.id),
            newFolder
          ]);
        }
        setOpen(false);
      });
    }
  };

  const handleDelete = folderId => {
    deleteFolder(folderId).then(() => {
      setFolders([...folders.filter(folder => folder.id !== folderId)]);
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Local Path</TableCell>
                  <TableCell>Drive Path</TableCell>
                  <TableCell>Auto Sync</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {folders.slice(0, rowsPerPage).map(folder => (
                  <TableRow className={classes.tableRow} hover key={folder.id}>
                    <TableCell>{folder.localPath}</TableCell>
                    <TableCell>{folder.drivePath}</TableCell>
                    <TableCell>
                      <Switch
                        onChange={() => handleAutoSync(folder.id)}
                        checked={folder.autoSync}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={16}
                        width={40}
                        className="react-switch"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(folder.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenModal(folder)}>
                        <EditIcon />
                      </IconButton>
                      <RouterLink to={`folders/${folder.id}`}>
                        <IconButton color="action">
                          <VisibilityIcon />
                        </IconButton>
                      </RouterLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button color="primary" variant="contained" onClick={handleOpenModal}>
          Add Folder
        </Button>
        <TablePagination
          component="div"
          count={folders.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
      <Modal open={open} className={classes.modal} onClose={handleCloseModal}>
        <Fade in={open}>
          <Card {...rest} className={clsx(classes.root, className)}>
            <form autoComplete="off">
              <CardHeader title={'Folder'} style={{ width: 600 }} />
              <Divider />
              <CardContent>
                <Grid>
                  <TextField
                    fullWidth
                    label="Local Path"
                    margin="dense"
                    name="localPath"
                    onChange={event =>
                      handleChange(event, 'localPath', event.target.value)
                    }
                    required
                    value={folder.localPath}
                    variant="outlined"
                  />
                </Grid>
                <br />
                <Grid>
                  <TextField
                    fullWidth
                    label="Drive Path"
                    margin="dense"
                    name="drivePath"
                    onChange={event =>
                      handleChange(event, 'drivePath', event.target.value)
                    }
                    required
                    value={folder.drivePath}
                    variant="outlined"
                  />
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSave}>
                  Save
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleCloseModal}>
                  Close
                </Button>
              </CardActions>
            </form>
          </Card>
        </Fade>
      </Modal>
    </Card>
  );
};

FoldersTable.propTypes = {
  className: PropTypes.string,
  folders: PropTypes.array.isRequired
};

export default FoldersTable;

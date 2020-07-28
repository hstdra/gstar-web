import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  CircularProgress
} from '@material-ui/core';
import fileSize from 'filesize';

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
  }
}));

const FilesTable = props => {
  const { className, files, ...rest } = props;
  const classes = useStyles();

  // const { user } = useSelector(state => state.session);
  const [keys, setKeys] = useState([]);
  const [viewingFiles, setViewingFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let viewingFiles = Object.assign(files);

    keys.forEach(key => {
      viewingFiles = viewingFiles.find(file => file.id === key).children;
    });

    setViewingFiles(viewingFiles);

    return () => {};
  }, [files, keys, page, rowsPerPage]);

  const handleSelectAll = event => {
    const { files } = props;

    let selectedFiles;

    if (event.target.checked) {
      selectedFiles = files.map(file => file.id);
    } else {
      selectedFiles = [];
    }

    setSelectedFiles(selectedFiles);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFiles.indexOf(id);
    let newSelectedFiles = [];

    if (selectedIndex === -1) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles, id);
    } else if (selectedIndex === 0) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles.slice(1));
    } else if (selectedIndex === selectedFiles.length - 1) {
      newSelectedFiles = newSelectedFiles.concat(selectedFiles.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFiles = newSelectedFiles.concat(
        selectedFiles.slice(0, selectedIndex),
        selectedFiles.slice(selectedIndex + 1)
      );
    }

    setSelectedFiles(newSelectedFiles);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleClickFile = file => {
    if (file.isDirectory) {
      keys.push(file.id);
      setKeys([...keys]);
    }
  };

  const handleClickBack = () => {
    keys.pop();
    setKeys([...keys]);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFiles.length === files.length}
                      color="primary"
                      indeterminate={
                        selectedFiles.length > 0 &&
                        selectedFiles.length < files.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Modified Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewingFiles
                  .slice(
                    page * rowsPerPage,
                    Math.min(viewingFiles.length, (page + 1) * rowsPerPage)
                  )
                  .map(file => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={file.id}
                      selected={selectedFiles.indexOf(file.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedFiles.indexOf(file.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, file.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell onClick={() => handleClickFile(file)}>
                        <div className={classes.nameContainer}>
                          <img
                            className={classes.avatar}
                            src={
                              'https://drive-thirdparty.googleusercontent.com/16/type/' +
                              file.mimeType
                            }
                            alt="Icon"
                          />
                          <Typography variant="body1">{file.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        {file.size ? fileSize(file.size) : ''}
                      </TableCell>
                      <TableCell>
                        {moment(file.modifiedTime).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{file.status}</TableCell>
                      <TableCell>
                        <CircularProgress
                          variant="static"
                          value={file.progress || 0}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickBack}
          disabled={keys.length === 0}>
          Back
        </Button>
        <TablePagination
          component="div"
          count={viewingFiles.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

FilesTable.propTypes = {
  className: PropTypes.string,
  files: PropTypes.array.isRequired
};

export default FilesTable;

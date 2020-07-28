import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { FilesToolbar, FilesTable } from './components';
import { useSelector } from 'react-redux';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FileList = () => {
  const classes = useStyles();
  const folderId = useRouter().match.params.id;

  const [files, setFiles] = useState([]);
  const data = useSelector(state => state.data);

  useEffect(() => {
    try {
      const { files } = data.find(file => file.id === folderId);
      if (files) {
        setFiles(files);
      }
    } catch (error) {}

    return () => {};
  }, [folderId, data]);

  useEffect(() => {
    return () => {};
  }, [files]);

  return (
    <div className={classes.root}>
      <FilesToolbar />
      <div className={classes.content}>
        <FilesTable files={files} />
      </div>
    </div>
  );
};

export default FileList;

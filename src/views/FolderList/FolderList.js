import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FoldersToolbar, FoldersTable } from './components';
import { getFolders } from 'services/core.service';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const FolderList = () => {
  const classes = useStyles();

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getFolders().then(folders => {
      setFolders(folders);
    });

    return () => {};
  }, []);

  return (
    <div className={classes.root}>
      <FoldersToolbar />
      <div className={classes.content}>
        <FoldersTable folders={folders} setFolders={setFolders} />
      </div>
    </div>
  );
};

export default FolderList;

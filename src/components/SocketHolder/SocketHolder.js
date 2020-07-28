import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { updateUserData } from 'redux/actions';
import { useDispatch } from 'react-redux';

const SocketHolder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    const socket = io('http://localhost:8001');

    socket.on('data', data => {
      console.log('SocketHolder -> data', data);
      dispatch(updateUserData(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return <div />;
};

export default SocketHolder;

export const LOAD_USER_DATA = 'LOAD_USER_DATA';

export const updateUserData = (data) => async dispatch => {
  localStorage.setItem('data', JSON.stringify(data));

  return dispatch({
    type: LOAD_USER_DATA,
    data
  });
};

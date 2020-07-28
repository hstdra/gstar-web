import authService from 'services/auth.service';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

export const login = () => async dispatch => {
  const userInfo = await authService.getUserInfo();
  const user = userInfo;
  localStorage.setItem('user', JSON.stringify(user));

  return dispatch({
    type: SESSION_LOGIN,
    user
  });
};

export const logout = () => async dispatch => {
  await authService.logout();

  dispatch({
    type: SESSION_LOGOUT
  });
};

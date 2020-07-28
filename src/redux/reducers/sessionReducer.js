import * as actionTypes from '../actions';

const user = JSON.parse(localStorage.getItem('user')) || {
  name: '',
  avatar: ''
};

const initialState = {
  loggedIn: false,
  user
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState,
        loggedIn: true,
        user: action.user
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;

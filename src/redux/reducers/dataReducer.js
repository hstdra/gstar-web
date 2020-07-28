import * as actionTypes from '../actions';

// const initialState = [];

const initialState = JSON.parse(localStorage.getItem('data')) || [];

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USER_DATA: {
      return [...action.data];
    }

    default: {
      return state;
    }
  }
};

export default dataReducer;

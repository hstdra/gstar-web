import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  data: dataReducer
});

export default rootReducer;

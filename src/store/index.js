import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import flightReducer from './flight/slice';

import themeReducer from './theme/slice';

const rootReducer = combineReducers({
  flight: flightReducer,
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: false,
});

export default store;

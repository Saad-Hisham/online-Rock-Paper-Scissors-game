import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Redux';

const store = configureStore({
  reducer: {
    player: counterReducer,
  },
});

export default store;
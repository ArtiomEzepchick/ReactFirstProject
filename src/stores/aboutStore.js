import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../components/About/formSlice';

export const aboutStore = configureStore({
  reducer: {
    form: formReducer,
  }
})
import { configureStore } from "@reduxjs/toolkit"
import formReducer from "../reducers/reduxReducer/reduxFormSlice"

export const store = configureStore({
  reducer: {
    form: formReducer,
  }
})
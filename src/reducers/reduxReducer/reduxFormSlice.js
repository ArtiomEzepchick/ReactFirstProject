import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { submitForm } from "./reduxFormAPI"

export const initialState = {
  name: "",
  surname: "",
  password: "",
  email: "",
  tel: "+",
  age: 0,
  carBrands: "mitsubishi",
  commentsField: "",
  count: 0,
  isLoading: false,
  isLoaded: false,
}

export const asyncSubmit = createAsyncThunk(
  "form/submitForm",
  async () => {
    const response = await submitForm()
    return response
  }
)

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.count += 1
    },
    decrementCounter: (state) => {
      state.count -= 1
    },
    changeFormValue: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
    clearForm: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSubmit.pending, (state) => {
        state.isLoaded = false
        state.isLoading = true
      })
      .addCase(asyncSubmit.fulfilled, (state) => {
        state.isLoading = false
        state.isLoaded = true
      })
      .addCase(asyncSubmit.rejected, (state) => {
        state.isLoaded = false
        state.isLoading = false
      })
  },
})

export const {
  incrementCounter,
  decrementCounter,
  changeFormValue,
  clearForm
} = formSlice.actions

export default formSlice.reducer
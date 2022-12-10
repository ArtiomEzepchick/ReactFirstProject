import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { submitForm } from './reduxFormAPI'

export const initialState = {
  name: '',
  surname: '',
  password: '',
  email: '',
  tel: '+',
  age: 0,
  carBrands: 'mitsubishi',
  commentsField: 'Comment here...',
  count: 0,
  status: 'idle',
  isLoaded: false,
}

export const asyncSubmit = createAsyncThunk(
  'form/submitForm',
  async () => {
    const response = await submitForm()
    return response
  }
)

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      state.count += 1
    },
    decrementCounter: (state, action) => {
      state.count -= 1
    },
    changeName: (state, action) => {
      state.name = action.payload
    },
    changeSurname: (state, action) => {
      state.surname = action.payload
    },
    changePassword: (state, action) => {
      state.password = action.payload
    },
    changeEmail: (state, action) => {
      state.email = action.payload
    },
    changeTel: (state, action) => {
      state.tel = action.payload
    },
    changeAge: (state, action) => {
      state.age = action.payload
    },
    changeCarBrands: (state, action) => {
      state.carBrands = action.payload
    },
    changeCommentsField: (state, action) => {
      state.commentsField = action.payload
    },
    focusTextArea: (state, action) => {
      state.commentsField = ''
    },
    clearForm: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSubmit.pending, (state, action) => {
        console.log('loading')
        state.isLoaded = false
        state.status = "loading";
      })
      .addCase(asyncSubmit.fulfilled, (state, action) => {
        console.log('idle')
        state.status = "idle";
        state.isLoaded = true
      })
      .addCase(asyncSubmit.rejected, (state, action) => {
        console.log('rejected')
        state.status = "rejected";
      })
  },
})

export const {
  incrementCounter,
  decrementCounter,
  changeName,
  changeSurname,
  changePassword,
  changeEmail,
  changeTel,
  changeAge,
  changeCarBrands,
  changeCommentsField,
  focusTextArea,
  clearForm
} = formSlice.actions

export default formSlice.reducer
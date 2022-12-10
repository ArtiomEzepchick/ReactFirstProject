import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchForm } from './reduxFormAPI'

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
}

export const asyncSubmit = createAsyncThunk(
  'form/fetchForm',
  async (fields) => {
    try {
      const response = await fetchForm(fields)
      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  }
)

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      state.count += 1
    },
    decrementCounter: (state) => {
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
    focusTextArea: (state) => {
      state.commentsField = ''
    },
    clearForm: () => {
      return initialState
    }
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
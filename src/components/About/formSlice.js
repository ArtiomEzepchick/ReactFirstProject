import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchForm } from './formAPI'
import FORM_INITIAL_VALUES from './initialValues'

const initialState = {
  name: FORM_INITIAL_VALUES.NAME_VALUE,
  surname: FORM_INITIAL_VALUES.SURNAME_VALUE,
}

export const asyncSubmit = createAsyncThunk(
  'aboutForm/fetchForm',
  async (fields) => {
    try {
      const response = await fetchForm(fields)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

export const formSlice = createSlice({
  name: 'aboutForm',
  initialState,
  reducers: {
    nameChange: (state, action) => {
      state.name = action.payload
    },
    surnameChange: (state, action) => {
      state.surname = action.payload
    },
    clearForm: () => {
      return initialState
    }
  },
})

export const { nameChange, surnameChange, clearForm } = formSlice.actions

export default formSlice.reducer
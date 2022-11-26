import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchForm } from './formAPI'
import FORM_INITIAL_VALUES from './initialValues'

const initialState = {
  name: FORM_INITIAL_VALUES.NAME_VALUE,
  surname: FORM_INITIAL_VALUES.SURNAME_VALUE,
}

export const formSlice = createSlice({
  name: 'form',
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

export const asyncSubmit = createAsyncThunk(
  'form/fetchForm',
  async (inputFields) => {
    try {
      let count = 0
      let mergedInputValues = ''

      const response = await fetchForm(inputFields)

      response.forEach(field => field ? mergedInputValues += field + ' ' : count++)

      switch (count) {
        case 2: {
          alert('You have both empty fields')
          return
        }

        case 1: {
          alert('You have one empty field')
          return
        }

        default: {
          alert(`You have submitted ${mergedInputValues}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
)

export default formSlice.reducer
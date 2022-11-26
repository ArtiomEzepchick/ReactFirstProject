import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nameChange, surnameChange, clearForm, asyncSubmit } from './formSlice'

const AboutForm = () => {
  const name = useSelector((state) => state.form.name)
  const surname = useSelector((state) => state.form.surname)
  const dispatch = useDispatch()

  const showCurrentFieldValue = (field, fieldName) => {
    return field ? `${fieldName} to submit is ${field}` : `Your ${fieldName} field is empty, nothing to submit`
  }

  const handleAsyncSubmit = (inputFields) => {
    dispatch(asyncSubmit(inputFields))
  }

  return (
    <form>
      <label>
        Name:
        <input
          value={name}
          onChange={e => dispatch(nameChange(e.target.value))}
        />
      </label>
      <label>
        Surname:
        <input
          value={surname}
          onChange={e => dispatch(surnameChange(e.target.value))}
        />
      </label>
      <button
        type='submit'
        onClick={(e) => {
            e.preventDefault()
            handleAsyncSubmit([name, surname])
            dispatch(clearForm())
          }
        }
      >
        Submit
      </button>
      <div style={{ marginTop: '2rem' }}>
        <p>
          {showCurrentFieldValue(name, 'Name')}
        </p>
        <p>
          {showCurrentFieldValue(surname, 'Surname')}
        </p>
      </div>
    </form>
  )
}

export default AboutForm
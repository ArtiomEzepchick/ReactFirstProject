import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { nameChange, surnameChange, clearForm, asyncSubmit } from './formSlice'
import AlertModal from '../AlertModal/AlertModal'

const AboutForm = () => {
  const formSelector = useSelector((state) => state.form)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  // const searchInput = useRef(null)

  // const handleFocus = () => {
  //   searchInput.current.focus()
  // }

  const showCurrentFieldValue = (field, fieldName) => {
    return field ? `${fieldName} to submit is ${field}` : `Your ${fieldName} field is empty, nothing to submit`
  }

  const checkAreEmptyFields = (fields) => {
    let emptyFields = {}

    for (let key in fields) {
      if (!fields[key]) {
        emptyFields = {
          ...emptyFields,
          [key]: true
        }
      }
    }

    return emptyFields
  }

  const emptyFields = Object.keys(checkAreEmptyFields(formSelector))

  const handleSubmit = (e) => {
    e.preventDefault()

    setTimeout(() => {
      dispatch(asyncSubmit(formSelector))
      setIsOpen(!isOpen)
    }, 500)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <React.Fragment>
      <form>
        <label>
          Name:
          <input

            value={formSelector.name}
            onChange={e => dispatch(nameChange(e.target.value))}
          />
        </label>
        <label>
          Surname:
          <input
            value={formSelector.surname}
            onChange={e => dispatch(surnameChange(e.target.value))}
          />
        </label>
        <button id='submit-btn' type='submit' onClick={handleSubmit}>Submit</button>
        <div style={{ marginTop: '2rem' }}>
          <p>{showCurrentFieldValue(formSelector.name, 'Name')}</p>
          <p>{showCurrentFieldValue(formSelector.surname, 'Surname')}</p>
        </div>
      </form>
      {emptyFields.length === 2 ?
        ReactDOM.createPortal(
          <AlertModal
            headerText='You have both empty fields'
            contentText='Please check you inputs'
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
          />, document.getElementById('modal')) :
        emptyFields.length === 1 ?
          ReactDOM.createPortal(
            <AlertModal
              headerText={`You have one empty field`}
              contentText='Please check your inputs'
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
            />, document.getElementById('modal')) :
          ReactDOM.createPortal(
            <AlertModal
              headerText='Success'
              contentText='You have submitted your data'
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
            />, document.getElementById('modal'))
      }
    </React.Fragment>
  )
}

export default AboutForm
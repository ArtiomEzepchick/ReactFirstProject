import React, { useState, useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { nameChange, surnameChange, clearForm, asyncSubmit } from './formSlice'
import AlertModal from '../AlertModal/AlertModal'
import MODAL_TYPES from '../AlertModal/modalTypes'

const AboutForm = () => {
  const formSelector = useSelector((state) => state.form)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const nameRef = useRef(null)
  const surnameRef = useRef(null)

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

  const emptyFieldsKeys = Object.keys(checkAreEmptyFields(formSelector))

  const focusInputWhenReturn = () => {
    const highlighFocusedInput = input => {
      input.current.focus()
      input.current.style.backgroundColor = '#ff3b3b98'

      setTimeout(() => {
        input.current.style.backgroundColor = '#ffffff'
      }, 1000)
    }

    emptyFieldsKeys[0] === 'name' ? highlighFocusedInput(nameRef) : highlighFocusedInput(surnameRef)
  }

  const handleReturn = () => {
    setIsOpen(!isOpen)
    focusInputWhenReturn()
  }

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
            className='form-input'
            ref={nameRef}
            value={formSelector.name}
            onChange={e => dispatch(nameChange(e.target.value))}
          />
        </label>
        <label>
          Surname:
          <input
            className='form-input'
            ref={surnameRef}
            value={formSelector.surname}
            onChange={e => dispatch(surnameChange(e.target.value))}
          />
        </label>
        <button type='submit' onClick={handleSubmit} style={{ padding: '0.2rem 2rem' }}>Submit</button>
        <div style={{ marginTop: '2rem' }}>
          <p>{showCurrentFieldValue(formSelector.name, 'Name')}</p>
          <p>{showCurrentFieldValue(formSelector.surname, 'Surname')}</p>
        </div>
      </form>

      {emptyFieldsKeys.length === 2 ?
        ReactDOM.createPortal(
          <AlertModal
            modalType={MODAL_TYPES.ALERT}
            headerText={`You have both ${emptyFieldsKeys.map((item, index) => index === 1 ? ' ' + item : item)} empty fields`}
            contentText='Please check you inputs'
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            handleReturn={handleReturn}
          />, document.getElementById('modal'))
        :
        emptyFieldsKeys.length === 1 ?
          ReactDOM.createPortal(
            <AlertModal
              modalType={MODAL_TYPES.ALERT}
              headerText={`Your ${emptyFieldsKeys[0]} field is empty`}
              contentText='Please check your input'
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
              handleReturn={handleReturn}
            />, document.getElementById('modal'))
          :
          ReactDOM.createPortal(
            <AlertModal
              modalType={MODAL_TYPES.SUCCESS}
              clearForm={() => dispatch(clearForm())}
              headerText='Great!'
              contentText='You have submitted your data'
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
            />, document.getElementById('modal'))
      }
    </React.Fragment>
  )
}

export default AboutForm
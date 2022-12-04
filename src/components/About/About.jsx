import React, { useState, useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { nameChange, surnameChange, clearForm, asyncSubmit } from './formSlice'
import AlertModal from '../AlertModal/AlertModal'
import MODAL_TYPES from '../AlertModal/modalTypes'

const AboutForm = () => {
  const formSelector = useSelector((state) => state.form)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const nameRef = useRef(null)
  const surnameRef = useRef(null)
  const root = document.getElementById('root')
  const modal = document.getElementById('modal')
  
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

  const emptyFields = checkAreEmptyFields(formSelector)
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

  const handleClearForm = () => dispatch(clearForm())

  const handleReturn = () => {
    setIsOpen(!isOpen)
    focusInputWhenReturn()
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCloseSuccessModal = () => {
    root.classList.remove('disabled')
    modal.classList.remove('show')
    handleClearForm()

    return navigate('/users')
}

  const handleSubmit = (e) => {
    e.preventDefault()

    setTimeout(() => {
      dispatch(asyncSubmit(formSelector))
      setIsOpen(!isOpen)
    }, 500)
  }

  const renderDefiniteModal = emptyFields => {
    let headerText
    let contentText

    const createModalPortal = (modalType) => ReactDOM.createPortal(
      <AlertModal
        modalType={modalType}
        headerText={headerText}
        contentText={contentText}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        handleReturn={handleReturn}
        handleClearForm={handleClearForm}
        handleCloseSuccessModal={handleCloseSuccessModal}
      />, modal)

    switch (Object.keys(emptyFields).length) {
      case 1:
        headerText = `Your ${emptyFieldsKeys[0]} field is empty`
        contentText = 'Please check your input'

        return createModalPortal(MODAL_TYPES.ALERT)

      case 2:
        headerText = `You have both ${emptyFieldsKeys.map((item, index) => index === 1 ? ' ' + item : item)} empty fields`
        contentText = 'Please check you inputs'

        return createModalPortal(MODAL_TYPES.ALERT)

      default:
        headerText = 'Great!'
        contentText = 'You have submitted your data'

        return createModalPortal(MODAL_TYPES.SUCCESS)
    }
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
      {renderDefiniteModal(emptyFields)}
    </React.Fragment>
  )
}

export default AboutForm
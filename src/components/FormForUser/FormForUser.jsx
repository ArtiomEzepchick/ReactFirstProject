import React from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import './styles.css'

const FormForUser = ({
    errors,
    inputs,
    inputDisabled,
    isLoading,
    state,
    submitButtonText,
    handleChange,
    handleBlur,
    handleFocus,
    handleCloseModal,
    handleSubmit
}) => {
    const closeModal = (e) => {
        e.preventDefault()
        handleCloseModal()
    }

    return (
        <form className={classNames('form-main-container', isLoading && 'blocked')}>
            {inputs.map(({ type, labelText, name }, index) => {
                return (<Input
                    key={labelText + index}
                    className={classNames('form-input-container')}
                    inputFieldClassName={classNames(
                        errors[name].dirty && errors[name].error && 'form-field-error',
                        inputDisabled && 'blocked'
                    )}
                    inputDisabled={inputDisabled}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleFocus={handleFocus}
                >
                    {isLoading && <Loader />}
                    {errors[name].dirty && errors[name].error
                        ? <p className='form-field-error-message'>{errors[name].message}</p>
                        : null
                    }
                </Input>)
            })}
            <div className={"modal-actions"}>
                <Button handleClick={closeModal}>Close</Button>
                <Button type='submit' handleClick={handleSubmit}>{submitButtonText}</Button>
            </div>
        </form>
    )
}

FormForUser.propTypes = {
    errors: PropTypes.object,
    inputs: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    state: PropTypes.object,
    submitButtonText: PropTypes.string,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleFocus: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default FormForUser
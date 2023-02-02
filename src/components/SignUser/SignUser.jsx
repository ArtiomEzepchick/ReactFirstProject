import React from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Input from "../Input/Input"
import Button from "../Button/Button"
import './styles.css'

const SignUser = ({
    errors,
    inputs,
    isInputDisabled,
    isLoading,
    state,
    submitButtonText,
    handleChange,
    handleBlur,
    handleFocus,
    handleCloseModal,
    handleSubmit
}) => {
    const closeModal = e => {
        e.preventDefault()
        handleCloseModal()
    }

    return (
        <form className={classNames('form-main-container', isLoading && 'blocked')} onSubmit={e => e.preventDefault()}>
            {inputs.map(({ type, labelText, name }, index) => {
                return (<Input
                    key={labelText + index}
                    className={classNames('form-input-container')}
                    inputFieldClassName={classNames(
                        errors[name].dirty && errors[name].error && 'form-field-error',
                        isInputDisabled && 'blocked'
                    )}
                    isInputDisabled={isInputDisabled}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleFocus={handleFocus}
                >
                    {errors[name].dirty && errors[name].error
                        ? <p className='form-field-error-message'>{errors[name].message}</p>
                        : null
                    }
                </Input>)
            })}
            <div className={"form-actions"}>
                <Button handleMouseDown={closeModal}>Close</Button>
                <Button type='submit' handleMouseDown={handleSubmit}>{submitButtonText}</Button>
            </div>
        </form>
    )
}

SignUser.propTypes = {
    errors: PropTypes.object,
    inputs: PropTypes.arrayOf(PropTypes.object),
    isInputDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    modalType: PropTypes.string,
    state: PropTypes.object,
    submitButtonText: PropTypes.string,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleFocus: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default SignUser
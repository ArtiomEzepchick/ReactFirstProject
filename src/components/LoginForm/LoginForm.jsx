import React from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { inputs } from "../../helpers/formHelpers/loginFormData"
import Loader from "../Loader/Loader"
import './styles.css'

const LoginForm = ({
    errors,
    isLoading,
    state,
    handleChange,
    handleFocus,
    handleCloseModal,
    handleSubmit
}) => {
    const closeModal = (e) => {
        e.preventDefault()
        handleCloseModal()
    }

    return (
        <form className={classNames('login-form', isLoading && 'blocked')}>
            {inputs.map(({ type, labelText, name }, index) => {
                return (<Input
                    key={labelText + index}
                    className={classNames('form-input-container')}
                    inputFieldClassName={classNames(errors[name].dirty && errors[name].error && 'form-field-error')}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
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
                <Button type='submit' handleClick={handleSubmit}>Login</Button>
            </div>
        </form>
    )
}

export default LoginForm
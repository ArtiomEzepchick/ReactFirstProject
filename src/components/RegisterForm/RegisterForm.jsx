import React from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Input from "../Input/Input"
import { inputs } from "../../helpers/registerFormHelpers/registerFormData"
import './styles.css'

const RegisterForm = ({
    isLoading,
    errors,
    state,
    handleChange,
    handleBlur
}) => {
    return (
        <form className={classNames('register-form', isLoading && 'blocked')}>
            {inputs.map(({ type, labelText, name }, index) => {
                return (<Input
                    className={classNames('form-input-container')}
                    key={labelText + index}
                    inputFieldClassName={classNames(errors[name].dirty && errors[name].error && 'form-field-error')}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                >
                    {errors[name].dirty && errors[name].error
                        ? <p className='form-field-error-message'>{errors[name].message}</p>
                        : null
                    }
                </Input>)
            })}
        </form>
    )
}

RegisterForm.propTypes = {
    isLoading: PropTypes.bool,
    errors: PropTypes.object,
    state: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func
}

export default RegisterForm
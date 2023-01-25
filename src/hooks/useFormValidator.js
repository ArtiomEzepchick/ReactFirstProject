import { useState } from "react"
import {
    registerValidators,
    loginValidators
} from "../helpers/formHelpers/formValidators"

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        }

        return acc
    }, {})
}

export const useFormValidator = (registerForm, loginForm, setIsLoading) => {
    const initialErrorsState = {}

    Object.keys(registerForm).forEach(key => {
        initialErrorsState[key] = {
            dirty: false,
            error: false,
            message: "",
        }
    })

    const [errors, setErrors] = useState(initialErrorsState)

    const validateForm = async ({ form, field, errors, type = 'register', forceTouchErrors = false }) => {
        let isValid = true
        let newErrors = { ...errors }

        if (forceTouchErrors) {
            newErrors = touchErrors(errors)
        }

        const checkFields = async (form, field, validator) => {
            for (let key in form) {
                if (newErrors[key].dirty && (field ? field === key : true)) {
                    setIsLoading(true)
                    const message = await validator(key, form[key], key === 'password' && form.email)
                    setIsLoading(false)
                    newErrors[key].error = !!message
                    newErrors[key].message = message
                    if (!!message) isValid = false
                }
            }
        }

        await checkFields(form, field, type === 'register' ? registerValidators : loginValidators)

        setErrors(newErrors)

        return { isValid, errors: newErrors }
    }

    const handleFocus = async (e, type = 'register') => {
        const field = e.target.name
        const fieldError = errors[field]

        const updatedErrors = {
            ...errors,
            [field]: {
                ...fieldError,
                dirty: false
            }
        }

        return type === 'register' 
        ? await validateForm({ form: registerForm, field, errors: updatedErrors })
        : await validateForm({ form: loginForm, field, errors: updatedErrors, type: 'login' })
    }

    const handleBlur = async (e) => {
        const field = e.target.name
        const fieldError = errors[field]

        if (fieldError.dirty) return

        const updatedErrors = {
            ...errors,
            [field]: {
                ...fieldError,
                dirty: true
            }
        }

        return await validateForm({ form: registerForm, field, errors: updatedErrors })
    }

    const clearErrors = () => setErrors(initialErrorsState)

    return {
        validateForm,
        handleBlur,
        handleFocus,
        clearErrors,
        errors,
    }
}
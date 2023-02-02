import { useState } from "react"
import {
    registerValidators,
    loginValidators,
    profileChangeValidators
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

export const useFormValidator = ({ registerForm, loginForm, userProfileForm }, setIsLoading) => {
    const initialErrorsState = {}

    const FORM_TYPES = {
        REGISTER: 'REGISTER',
        LOGIN: 'LOGIN',
        PROFILE: 'PROFILE'
    }

    const { REGISTER, LOGIN, PROFILE } = FORM_TYPES

    Object.keys(registerForm || loginForm || userProfileForm).forEach(key => {
        initialErrorsState[key] = {
            dirty: false,
            error: false,
            message: "",
        }
    })

    const [errors, setErrors] = useState(initialErrorsState)

    const validateForm = async ({
        errors,
        field,
        forceTouchErrors = false,
        form,
        type = REGISTER,
        previousNickname,
        previousEmail
    }) => {
        let isValid = true
        let newErrors = { ...errors }
        let currentValidators = null

        if (forceTouchErrors) {
            newErrors = touchErrors(errors)
        }

        const checkFields = async (form, field, validators) => {
            for (let key in form) {
                if (newErrors[key].dirty && (field ? field === key : true)) {
                    try {
                        setIsLoading(true)

                        const message = await validators({ 
                            fieldName: key, 
                            field: form[key], 
                            emailForPasswordCheck: key === 'password' && form.email, 
                            previousNickname, 
                            previousEmail
                        })
    
                        setIsLoading(false)
                        newErrors[key].error = !!message
                        newErrors[key].message = message
                        if (!!message) isValid = false
                    } catch {
                        throw new Error('Failed to check field')
                    } finally {
                        setIsLoading(false)
                    }
                }
            }
        }

        if (type === REGISTER) currentValidators = registerValidators
        if (type === LOGIN) currentValidators = loginValidators
        if (type === PROFILE) currentValidators = profileChangeValidators

        await checkFields(form, field, currentValidators)

        setErrors(newErrors)

        return { isValid, errors: newErrors }
    }

    const handleFocus = async (e, type = REGISTER) => {
        const field = e.target.name
        const fieldError = errors[field]

        const updatedErrors = {
            ...errors,
            [field]: {
                ...fieldError,
                dirty: false
            }
        }

        if (type === LOGIN) {
            return await validateForm({ form: loginForm, field, errors: updatedErrors, type: LOGIN })
        }

        if (type === PROFILE) {
            return await validateForm({ form: userProfileForm, field, errors: updatedErrors, type: PROFILE })
        }

        return await validateForm({ form: registerForm, field, errors: updatedErrors })
    }

    const handleBlur = async (e, type = REGISTER) => {
        const field = e.target.name
        const fieldError = errors[field]

        if (type === PROFILE) return
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
        errors,
        FORM_TYPES,
        clearErrors,
        handleBlur,
        handleFocus,
        validateForm,
    }
}
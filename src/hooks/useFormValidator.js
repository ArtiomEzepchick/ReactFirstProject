import { useState } from "react"
import {
    nameRegisterValidator,
    emailRegisterValidator,
    passwordRegisterValidator,
    confirmPasswordRegisterValidator,
    nameLoginValidator,
    passwordLoginValidator
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
    const initialErrorsState = {
        name: {
            dirty: false,
            error: false,
            message: "",
        },
        email: {
            dirty: false,
            error: false,
            message: "",
        },
        password: {
            dirty: false,
            error: false,
            message: "",
        },
        confirmPassword: {
            dirty: false,
            error: false,
            message: "",
        }
    }

    const [errors, setErrors] = useState(initialErrorsState)

    const validateForm = async ({ registerForm, field, errors, forceTouchErrors = false }) => {
        let isValid = true
        let nextErrors = { ...errors }

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors)
        }

        const { name, email, password, confirmPassword } = registerForm

        if (nextErrors.name.dirty && (field ? field === "name" : true)) {
            setIsLoading(true)
            const nameMessage = await nameRegisterValidator(name)
            setIsLoading(false)
            nextErrors.name.error = !!nameMessage
            nextErrors.name.message = nameMessage
            if (!!nameMessage) isValid = false
        }

        if (nextErrors.email.dirty && (field ? field === "email" : true)) {
            setIsLoading(true)
            const emailMessage = await emailRegisterValidator(email)
            setIsLoading(false)
            nextErrors.email.error = !!emailMessage
            nextErrors.email.message = emailMessage
            if (!!emailMessage) isValid = false
        }

        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
            const passwordMessage = passwordRegisterValidator(password)
            nextErrors.password.error = !!passwordMessage
            nextErrors.password.message = passwordMessage
            if (!!passwordMessage) isValid = false
        }

        if (nextErrors.confirmPassword.dirty && (field ? field === "confirmPassword" : true)) {
            const confirmPasswordMessage = confirmPasswordRegisterValidator(confirmPassword, password)
            nextErrors.confirmPassword.error = !!confirmPasswordMessage
            nextErrors.confirmPassword.message = confirmPasswordMessage
            if (!!confirmPasswordMessage) isValid = false
        }

        setErrors(nextErrors)

        return {
            isValid,
            errors: nextErrors,
        }
    }

    const validateLoginForm = async ({ loginForm, field, errors, forceTouchErrors = false }) => {
        let isValid = true
        let nextErrors = { ...errors }

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors)
        }

        const { name, password } = loginForm

        if (nextErrors.name.dirty && (field ? field === "name" : true)) {
            setIsLoading(true)
            const nameMessage = await nameLoginValidator(name)
            setIsLoading(false)
            nextErrors.name.error = !!nameMessage
            nextErrors.name.message = nameMessage
            if (!!nameMessage) isValid = false
        }

        if (nextErrors.password.dirty && (field ? field === "password" : true)) {
            setIsLoading(true)
            const passwordMessage = await passwordLoginValidator(name, password)
            setIsLoading(false)
            nextErrors.password.error = !!passwordMessage
            nextErrors.password.message = passwordMessage
            if (!!passwordMessage) isValid = false
        }        

        setErrors(nextErrors)

        return {
            isValid,
            errors: nextErrors,
        }
    }

    const handleFocus = async (e, type = 'register') => {
        const field = e.target.name

        const updatedErrors = {
            ...errors,
            [field]: {
                ...errors[field],
                dirty: false
            }
        }

        if (type === 'register') {
            return await validateForm({ registerForm, field, errors: updatedErrors })
        }

        if (type === 'login') {
            return await validateLoginForm({ loginForm, field, errors: updatedErrors })
        }
    }

    const handleBlur = async (e, type = 'register') => {
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

        if (type === 'register') {
            await validateForm({ registerForm, field, errors: updatedErrors })
        }

        if (type === 'login') {
            await validateLoginForm({ loginForm, field, errors: updatedErrors })
        }
    }

    const clearErrors = () => setErrors(initialErrorsState)

    return {
        validateForm,
        validateLoginForm,
        handleBlur,
        handleFocus,
        clearErrors,
        errors,
    }
}
export const REGISTER_FORM_ACTION_TYPES = {
    CHANGE_VALUE: 'CHANGE_VALUE',
    RESET: 'RESET'
}

const { CHANGE_VALUE, RESET } = REGISTER_FORM_ACTION_TYPES

export const initialValues = {
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    email: ''
}

export const registerFormReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_VALUE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case RESET:
            return initialValues
        default:
            throw new Error()
    }
}
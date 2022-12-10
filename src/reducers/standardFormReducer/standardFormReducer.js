import { STANDARD_FORM_ACTION_TYPES } from "./standardFormActionTypes"

const { 
    INCREMENT_COUNTER, 
    DECREMENT_COUNTER, 
    CHANGE_VALUE, 
    FOCUS_TEXTAREA, 
    RESET 
} = STANDARD_FORM_ACTION_TYPES
 
export const initialValues = {
    name: '',
    surname: '',
    password: '',
    email: '',
    tel: '+',
    age: 0,
    carBrands: 'mitsubishi',
    commentsField: 'Comment here...',
    count: 0,
}

export const standardFormReducer = (state, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                count: state.count + 1
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                count: state.count - 1
            }
        case CHANGE_VALUE:
            console.log(action.payload.name)
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FOCUS_TEXTAREA:
            return {
                ...state,
                [action.payload.name]: ''
            }
        case RESET:
            return initialValues
        default:
            throw new Error()
    }
}

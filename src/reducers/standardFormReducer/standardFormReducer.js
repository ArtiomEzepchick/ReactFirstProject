import { STANDARD_FORM_ACTION_TYPES } from "./standardFormActionTypes"

const { INCREMENT_COUNTER, DECREMENT_COUNTER, CHANGE_VALUE, FOCUS_TEXTAREA, IS_LOADING, IS_LOADED, RESET } = STANDARD_FORM_ACTION_TYPES
 
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
    loading: false,
    loaded: false
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
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case FOCUS_TEXTAREA:
            return {
                ...state,
                [action.payload.name]: ''
            }
        case IS_LOADING: 
            return {
                ...state,
                loading: !state.loading
            }
        case IS_LOADED: 
            return {
                ...state,
                loaded: !state.loaded
            }
        case RESET:
            return initialValues
        default:
            throw new Error()
    }
}

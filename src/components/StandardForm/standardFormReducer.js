import { STANDARD_FORM_ACTION_TYPES } from "./standardFormActionTypes"

const { INCREMENT_COUNTER, DECREMENT_COUNTER, CHANGE_VALUE, RESET } = STANDARD_FORM_ACTION_TYPES
 
export const initialValues = {
    name: '',
    surname: '',
    password: '',
    email: '',
    tel: '+',
    age: 0,
    carBrands: 'mitsubishi',
    commentsField: 'Type some comments here',
    count: 0
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
        case RESET:
            return initialValues
        default:
            throw new Error()
    }
}

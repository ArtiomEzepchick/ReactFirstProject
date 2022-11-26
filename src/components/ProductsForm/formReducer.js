import FORM_INITIAL_VALUES from "./initialValues"

export const initialValues = {
    name: FORM_INITIAL_VALUES.NAME_VALUE,
    surname: FORM_INITIAL_VALUES.SURNAME_VALUE,
    password: FORM_INITIAL_VALUES.PASSWORD_VALUE,
    email: FORM_INITIAL_VALUES.EMAIL_VALUE,
    tel: FORM_INITIAL_VALUES.TEL_VALUE,
    age: FORM_INITIAL_VALUES.AGE_VALUE,
    carBrands: FORM_INITIAL_VALUES.CAR_BRANDS_VALUE,
    commentsField: FORM_INITIAL_VALUES.COMMENTS_FIELD_VALUE,
    count: FORM_INITIAL_VALUES.COUNT_VALUE
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            }
        case 'decrement':
            return {
                ...state,
                count: state.count - 1
            }
        case 'nameChange':
            return {
                ...state,
                name: action.payload
            }
        case 'surnameChange':
            return {
                ...state,
                surname: action.payload
            }
        case 'passwordChange':
            return {
                ...state,
                password: action.payload
            }
        case 'emailChange':
            return {
                ...state,
                email: action.payload
            }
        case 'telChange':
            return {
                ...state,
                tel: action.payload
            }
        case 'ageChange':
            return {
                ...state,
                age: action.payload
            }
        case 'carBrandsChange':
            return {
                ...state,
                carBrands: action.payload
            }
        case 'commentsFieldChange':
            return {
                ...state,
                commentsField: action.payload
            }
        case 'reset':
            return initialValues
        default:
            throw new Error()
    }
}

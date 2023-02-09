export const STANDARD_FORM_ACTION_TYPES = {
    INCREMENT_COUNTER: "INCREMENT_COUNTER",
    DECREMENT_COUNTER: "DECREMENT_COUNTER",
    CHANGE_VALUE: "CHANGE_VALUE",
    SET_LOADING: "SET_LOADING",
    SET_LOADED: "SET_LOADED",
    RESET: "RESET"
}

const {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    CHANGE_VALUE,
    SET_LOADING,
    SET_LOADED,
    RESET
} = STANDARD_FORM_ACTION_TYPES

export const initialValues = {
    name: "",
    surname: "",
    password: "",
    email: "",
    tel: "+",
    age: 0,
    carBrands: "mitsubishi",
    commentsField: "",
    count: 0,
    isLoading: false,
    isLoaded: false,
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
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload
            }
        case RESET:
            return initialValues
        default:
            throw new Error()
    }
}

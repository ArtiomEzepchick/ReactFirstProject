export const initialState = {
    isHorizontal: true,
    darkMode: false,
    modalSettings: {
        modalType: '',
        headerText: '',
        contentText: '',
    },
    userName: ''
}

export const REDUCER_TYPES = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    TOGGLE_ORIENTATION: 'TOGGLE_ORIENTATION',
    CHANGE_MODAL: 'CHANGE_MODAL',
    SET_USERNAME: 'SET_USERNAME'
}

export const reducers = ((state, action) => {
    switch (action.type) {
        case REDUCER_TYPES.TOGGLE_THEME:
            return {
                ...state,
                darkMode: !state.darkMode
            }
        case REDUCER_TYPES.TOGGLE_ORIENTATION:
            return {
                ...state,
                isHorizontal: !state.isHorizontal
            }
        case REDUCER_TYPES.CHANGE_MODAL:
            return {
                ...state,
                modalSettings: action.payload
            }
        case REDUCER_TYPES.SET_USERNAME:
            return {
                ...state,
                userName: action.payload
            }
        default:
            return state
    }
})
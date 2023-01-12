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
    SET_DARK_THEME: 'SET_DARK_THEME',
    TOGGLE_ORIENTATION: 'TOGGLE_ORIENTATION',
    SET_ORIENTATION: 'SET_ORIENTATION',
    CHANGE_MODAL: 'CHANGE_MODAL',
    SET_USERNAME: 'SET_USERNAME'
}

export const reducers = ((state, action) => {
    switch (action.type) {
        case REDUCER_TYPES.TOGGLE_THEME:
            const currentTheme = localStorage.getItem('theme')

            if (currentTheme === 'light') {
                localStorage.setItem('theme', 'dark')

                return {
                    ...state,
                    darkMode: !state.darkMode
                }
            } else {
                localStorage.setItem('theme', 'light')

                return {
                    ...state,
                    darkMode: !state.darkMode
                }
            }
        case REDUCER_TYPES.SET_DARK_THEME:
            return {
                ...state,
                darkMode: true
            }
        case REDUCER_TYPES.TOGGLE_ORIENTATION:
            const currentNavOrientation = localStorage.getItem('navOrientation')

            if (currentNavOrientation === 'horizontal') {
                localStorage.setItem('navOrientation', 'leftSide')

                return {
                    ...state,
                    isHorizontal: !state.isHorizontal
                }
            } else {
                localStorage.setItem('navOrientation', 'horizontal')

                return {
                    ...state,
                    isHorizontal: !state.isHorizontal
                }
            }
        case REDUCER_TYPES.SET_ORIENTATION:
            return {
                ...state,
                isHorizontal: false
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
export const initialState = {
    isHorizontal: true,
    darkMode: false
}

export const REDUCER_TYPES = {
    TOGGLE_THEME: 'TOGGLE_THEME',
    TOGGLE_ORIENTATION: 'TOGGLE_ORIENTATION'
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

        default: 
            return state
    }
})
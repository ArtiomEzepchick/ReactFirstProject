export const CHAT_ACTION_TYPES = {
    SET_MODAL_OPEN: 'SET_MODAL_OPEN',
    SET_LOADING: 'SET_LOADING',
    SET_EDIT_MODE: 'SET_EDIT_MODE',
    SET_POSTS: 'SET_POSTS',
    SET_POSTS_NEXT_PAGE: 'SET_POSTS_NEXT_PAGE',
    SET_POSTS_COUNT: 'SET_POSTS_COUNT',
    SET_MESSAGE: 'SET_MESSAGE',
    SET_CHANGED_MESSAGE: 'SET_CHANGED_MESSAGE',
    SET_CURRENT_POST_ID: 'SET_CURRENT_POST_ID'
}

const {
    SET_MODAL_OPEN,
    SET_LOADING,
    SET_EDIT_MODE,
    SET_POSTS,
    SET_POSTS_NEXT_PAGE,
    SET_POSTS_COUNT,
    SET_MESSAGE,
    SET_CHANGED_MESSAGE,
    SET_CURRENT_POST_ID
} = CHAT_ACTION_TYPES

export const initialValues = {
    isModalOpen: false,
    isLoading: false,
    isEditMode: false,
    posts: [],
    postsNextPage: 2,
    postsCount: 0,
    message: '',
    savedMessage: '',
    changedMessage: '',
    currentPostId: '',
}

export const chatReducer = (state, action) => {
    switch (action.type) {
        case SET_MODAL_OPEN:
            return {
                ...state,
                isModalOpen: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                isEditMode: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_POSTS_NEXT_PAGE:
            return {
                ...state,
                postsNextPage: action.payload
            }
        case SET_POSTS_COUNT:
            return {
                ...state,
                postsCount: action.payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case SET_CHANGED_MESSAGE:
            return {
                ...state,
                changedMessage: action.payload
            }
        case SET_CURRENT_POST_ID:
            return {
                ...state,
                currentPostId: action.payload
            }
        default:
            throw new Error()
    }
}

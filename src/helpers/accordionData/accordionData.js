export const accordionHomePageData = [
    {
        title: "About this project",
        content: [
            { text: "Created registration and login forms with validation (for example, some inputs check asynchronously whether a user with the same nickname or email exists on the server)" },
            { text: "Developed useFormValidator hook without the use of third-party libraries. It's also possible to change your profile data in the user's cabinet" },
            { text: "All pages support theme change and navigation panel reorientation (React.createContext and useContext hook)" },
            { text: "Used dynamic imports (React.lazy, React.Suspense and Loader-component) to simulate code-splitting" },
            { text: "Project is made of functional components" },
            { text: "Used React Router, Portals" },
            { text: "All components have propTypes check (where its needed)" },
            { text: "Consumed 3rd-party libraries as Ant.d, coolors, classNames, nanoid, JSON server" },
        ]
    },
    {
        title: "What's here?",
        content: [
            { text: "This page represents standard form with different inputs and areas" },
            { text: "You are able to change counter and check current/previous value after submitting" },
            { text: "You can use all fields after submitting too. Your data will be processed in real time"}
        ]
    },
    {
        title: "What React features were used on this page?",
        content: [
            { text: "useReducer, useState, useEffect, useRef hooks" },
            { text: "useWindowSize custom hook" },
            { text: "React.memo for previousCount value" }
        ]
    },
]

export const accordionReduxPageData = [
    {
        title: "What's here?",
        content: [
            { text: "This page is the same form as on Home page but fully using Redux Toolkit" }
        ]
    },
    {
        title: "What Redux TLK features were used on this page?",
        content: [
            { text: "configureStore" },
            { text: "createSlice" },
            { text: "createAsyncThunk" },
            { text: "extraReducers builder" },
            { text: "useDispatch and useSelector hooks" }
        ]
    },
]

export const accordionPostsPageData = [
    {
        title: "What's here?",
        content: [
            { text: "This page consumes REST API and modal notifications" },
            { text: "An authorized user can send messages and read messages posted by other users. The current user can only edit or delete messages sent by him" },
            { text: "The edited message will be displayed with a 'changed' flag. A new message (if it exists) will be requested from the server and displayed after any message is deleted" },
            { text: "Pagination: the chat component does not receive all messages from the server, but only a certain number. You can get more messages by clicking the show more button" }
        ]
    },
    {
        title: "What features were used on this page?",
        content: [
            { text: "GET, POST, PATCH, DELETE methods with fetch" },
            { text: "useCallback" },
            { text: "useEffect" },
            { text: "useState" },
            { text: "useRef" },
            { text: "useScrollLock custom hook" },
        ]
    }
]
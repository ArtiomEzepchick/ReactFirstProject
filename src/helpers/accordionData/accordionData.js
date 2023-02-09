export const accordionHomePageData = [
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
    {
        title: "What else about this project?",
        content: [
            { text: "All pages support theme change and navigation panel reorientation (React.createContext and useContext hook)" },
            { text: "Used dynamic imports (React.lazy, React.Suspense and Loader-component) to simulate code-splitting" },
            { text: "Project is made of functional components" },
            { text: "Used React Router, Portals"},
            { text: "All components have propTypes check (where its needed)" },
            { text: "Consumed 3rd-party libraries as Ant.d, coolors, classNames, nanoid, JSON server" },
        ]
    }
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
            { text: "This page consumes REST API and modal notifications" }
        ]
    },
    {
        title: "What features were used on this page?",
        content: [
            { text: "GET, POST, DELETE methods with fetch" },
            { text: "useCallback" },
            { text: "useEffect" },
            { text: "useState" },
            { text: "useRef" },
            { text: "useScrollLock custom hook" },
            { text: "ReactDOM.createPortal" }
        ]
    }
]
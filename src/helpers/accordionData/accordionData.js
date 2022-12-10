export const accordionHomePageData = [
    {
        title: `What's on this page?`,
        content: `This page represents standard form with different inputs and areas.
        You can use all fields after submitting too. Your data will be processed in real time. 
        This is done for the visibility of the state's work.`
    },
    {
        title: 'What React features were used here?',
        content: `This page is completely built on functional components. Used different hooks: useState - to use state of the component. 
        useReducer - to manage complex form state logic. useRef (in addition with React.memo and useEffect hook) - 
        to memoize previous counter value. Custom hook useWindowSize - to get width/height window properties.`
    },
    {
        title: 'What else about this project?',
        content: `All pages support theme change and navigation panel reorientation. 
        This is done using useContext and useReducer (to manage orientation and theme states in one place) hooks. Used dynamic
        imports (with React.lazy, React.Suspense functions and Loader-component) to simulate code-splitting`
    }
]

export const accordionReduxPageData = [
    {
        title: `What's on this page?`,
        content: `This page represents the same form as on Home page but fully using Redux and Redux Toolkit.`
    },
    {
        title: 'What React features were used here?',
        content: ``
    }
]
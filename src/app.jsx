import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { routes } from "./helpers/routes/routes";
import { initialState, reducers } from "./reducers/contextReducer/contextReducer";
import { ThemeContext } from "./contexts/themeContext/ThemeContext";
import { OrientationContext } from "./contexts/orientationContext/OrientationContext";
import { ModalContext } from "./contexts/modalContext/ModalContext";
import { UserContext } from "./contexts/userContext/userContext";
import { REDUCER_TYPES } from "./reducers/contextReducer/contextReducer";
import { store } from './stores/store';

const App = () => {
    const [state, dispatch] = useReducer(reducers, initialState)

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme')
        const currentNavOrientation = localStorage.getItem('navOrientation')

        if (!currentTheme) {
            localStorage.setItem('theme', 'light')
        }

        if (!currentNavOrientation) {
            localStorage.setItem('navOrientation', 'horizontal')
        }

        if (currentNavOrientation === 'leftSide') {
            dispatch({ type: REDUCER_TYPES.SET_ORIENTATION })
        }

        if (currentTheme === 'dark') {
            dispatch({ type: REDUCER_TYPES.SET_DARK_THEME })
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {routes.map(({ path, component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <UserContext.Provider value={{ state, dispatch }}>
                                    <ModalContext.Provider value={{ state, dispatch }}>
                                        <OrientationContext.Provider value={{ state, dispatch }}>
                                            <ThemeContext.Provider value={{ state, dispatch }} >
                                                {component}
                                            </ThemeContext.Provider>
                                        </OrientationContext.Provider>
                                    </ModalContext.Provider>
                                </UserContext.Provider>
                            }
                        />
                    ))}
                </Routes>
            </Router >
        </Provider>
    )
}

export default App
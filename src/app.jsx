import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import routes from "./helpers/routes/routes";
import { initialState, reducers } from "./reducers/contextReducer/contextReducer";
import { ThemeContext } from "./contexts/themeContext/ThemeContext";
import { OrientationContext } from "./contexts/orientationContext/OrientationContext";
import { ModalContext } from "./contexts/modalContext/ModalContext";
import { store } from './stores/store';

const App = () => {
    const [state, dispatch] = useReducer(reducers, initialState)

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {routes.map(({ path, component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <ModalContext.Provider value={{ state, dispatch }}>
                                    <OrientationContext.Provider value={{ state, dispatch }}>
                                        <ThemeContext.Provider value={{ state, dispatch }} >
                                            {component}
                                        </ThemeContext.Provider>
                                    </OrientationContext.Provider>
                                </ModalContext.Provider>
                            }
                        />
                    ))}
                </Routes>
            </Router >
        </Provider>
    )
}

export default App
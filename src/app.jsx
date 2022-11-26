import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import routes from "./helpers/routes/routes";
import { initialState, reducers } from "./reducers/contextReducer/contextReducers";
import { ThemeContext } from "./contexts/ThemeContext";
import { OrientationContext } from "./contexts/OrientationContext";
import { aboutStore } from './stores/aboutStore';

const App = () => {
    const [state, dispatch] = useReducer(reducers, initialState)

    return (
        <Provider store={aboutStore}>
            <Router>
                <Routes>
                    {routes.map(({ path, component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <OrientationContext.Provider value={{ state, dispatch }}>
                                    <ThemeContext.Provider value={{ state, dispatch }} >
                                        {component}
                                    </ThemeContext.Provider>
                                </OrientationContext.Provider>
                            }
                        />
                    ))}
                </Routes>
            </Router >
        </Provider>
    )
}

export default App
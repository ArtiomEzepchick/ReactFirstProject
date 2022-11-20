import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from "./pages/helpers/routes/routes";
import { initialState, reducers } from "./reducers/reducers";
import { ThemeContext } from "./contexts/ThemeContext";
import { OrientationContext } from "./contexts/OrientationContext";

const App = () => {
    const [state, dispatch] = useReducer(reducers, initialState)

    return (
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
    )
}

export default App
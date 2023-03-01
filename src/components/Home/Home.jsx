import React, { useReducer, useEffect, useRef } from "react"

import Accordion from "../Accordion/Accordion"
import FormForStateManagers from "../FormForStateManagers/FormForStateManagers"
import Button from "../Button/Button"
import ResultsData from "../ResultsData/ResultsData"
import Loader from "../Loader/Loader"

import { useWindowSize } from "../../hooks/useWindowSize"
import { STANDARD_FORM_ACTION_TYPES, standardFormReducer, initialValues } from "../../reducers/standardFormReducer/standardFormReducer"
import { generateResultData } from "../../helpers/formHelpers/formStateManagersData"
import { accordionHomePageData } from "../../helpers/accordionData/accordionData"
import "./styles.css"

const {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    CHANGE_VALUE,
    SET_LOADING,
    SET_LOADED,
    RESET
} = STANDARD_FORM_ACTION_TYPES

const Home = () => {
    const [state, dispatch] = useReducer(standardFormReducer, initialValues)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(state, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count])

    const handleChange = e => dispatch({ type: CHANGE_VALUE, payload: e.target })

    const handleReset = () => {
        dispatch({ type: SET_LOADING, payload: false })
        dispatch({ type: RESET })
    }

    const handleIncreaseCounter = () => dispatch({ type: INCREMENT_COUNTER })

    const handleDecreaseCounter = () => dispatch({ type: DECREMENT_COUNTER })

    const imitateSubmitting = () => {
        dispatch({ type: SET_LOADING, payload: true })

        new Promise(res => {
            setTimeout(() => {
                dispatch({ type: SET_LOADING, payload: false })
                dispatch({ type: SET_LOADED, payload: true })
                res()
            }, 2000)
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        dispatch({ type: SET_LOADING, payload: false })
        imitateSubmitting()
    }

    return (
        <React.Fragment>
            <h1 style={{ marginTop: "1rem" }}>
                Welcome to <span className="highlight-blue">Artsiom Ezepchik's</span> React project
            </h1>
            <hr />
            <section className="accordion-container">
                {accordionHomePageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </section>
            <hr />
            <section className="main-container">
                <FormForStateManagers
                    state={state}
                    prevCountRef={prevCountRef}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                />

                {state.isLoading 
                ? <Loader /> 
                : <ResultsData
                        isLoaded={state.isLoaded}
                        data={resultData}
                        counterValue={state.count}
                    />
                }

                <Button className="reset-button" handleClick={handleReset}>Reset</Button>
            </section>
        </React.Fragment>
    )
}

export default Home
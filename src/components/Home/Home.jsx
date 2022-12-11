import React, { useReducer, useEffect, useRef } from 'react'
import Accordion from '../Accordion/Accordion'
import Form from '../Form/Form'
import Button from '../Button/Button'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import { standardFormReducer, initialValues } from '../../reducers/standardFormReducer/standardFormReducer'
import { STANDARD_FORM_ACTION_TYPES } from '../../reducers/standardFormReducer/standardFormActionTypes'
import { generateResultData } from '../../helpers/formData/formData'
import { accordionHomePageData } from '../../helpers/accordionData/accordionData'

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

    const handleChange = (e) => dispatch({ type: CHANGE_VALUE, payload: e.target })

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

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch({ type: SET_LOADING, payload: false })
        imitateSubmitting()
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Welcome to <span className='highlight-red'>Artsiom Ezepchik's</span> first React project
            </h1>
            <hr />
            <div className="accordion">
                {accordionHomePageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <div className='form-container'>
                <Form
                    state={state}
                    prevCountRef={prevCountRef}
                    isLoading={state.isLoading}
                    isLoaded={state.isLoaded}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                />

                {state.isLoading ?
                    <Loader /> :
                    <ResultsData
                        isLoaded={state.isLoaded}
                        data={resultData}
                        counterValue={state.count}
                    />
                }

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={handleReset}
                />
            </div>
        </div>
    )
}

export default Home
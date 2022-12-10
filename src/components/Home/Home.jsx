import React, { useReducer, useEffect, useRef, useState } from 'react'
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
    FOCUS_TEXTAREA,
    RESET
} = STANDARD_FORM_ACTION_TYPES

const Home = () => {
    const [state, dispatch] = useReducer(standardFormReducer, initialValues)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(state, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count])

    const handleFocusTextArea = (e) => {
        if (e.target.value === initialValues.commentsField) return dispatch({ type: FOCUS_TEXTAREA, payload: e.target })
    }

    const handleChange = (e) => dispatch({ type: CHANGE_VALUE, payload: e.target })

    const handleReset = () => {
        setIsLoaded(false)
        dispatch({ type: RESET })
    }

    const showResultsBlock = () => {
        if (isLoading) return <Loader />
        if (isLoaded) return <ResultsData data={resultData} counterValue={state.count} />
    }

    const handleIncreaseCounter = () => dispatch({ type: INCREMENT_COUNTER })
    
    const handleDecreaseCounter = () => dispatch({ type: DECREMENT_COUNTER })

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
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    dispatch={dispatch}
                    handleFocusTextArea={handleFocusTextArea}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDecreaseCounter={handleDecreaseCounter}
                />

                {showResultsBlock()}

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
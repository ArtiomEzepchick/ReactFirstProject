import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Accordion from '../Accordion/Accordion'
import Form from '../Form/Form'
import Button from '../Button/Button'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import {
    initialState,
    incrementCounter,
    decrementCounter,
    focusTextArea,
    clearForm
} from '../../reducers/reduxReducer/reduxFormSlice'
import { generateResultData } from '../../helpers/formData/formData'
import { accordionReduxPageData } from '../../helpers/accordionData/accordionData'
import { chooseReduxAction } from '../../helpers/chooseReduxAction/chooseReduxAction'

const ReduxForm = () => {
    const dispatch = useDispatch()
    const formSelector = useSelector((state) => state.form)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const prevCountRef = useRef(0)
    const { width, height } = useWindowSize()
    const resultData = generateResultData(formSelector, { width, height, prevCount: prevCountRef.current })

    useEffect(() => {
        prevCountRef.current = formSelector.count
    }, [formSelector.count])

    const handleFocusTextArea = (e) => {
        if (e.target.value === initialState.commentsField) return dispatch(focusTextArea())
    }

    const handleChange = (e, name) => {
        dispatch(chooseReduxAction(e, name))
    }

    const handleIncreaseCounter = () => dispatch(incrementCounter())
    const handleDeacreaseCounter = () => dispatch(decrementCounter())

    const handleReset = () => {
        setIsLoaded(false)
        dispatch(clearForm())
    }

    const showResultsBlock = () => {
        if (isLoading) return <Loader />
        if (isLoaded) return <ResultsData data={resultData} counterValue={formSelector.count} />
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Form using <span className='highlight-red'>Redux Toolkit</span>
            </h1>
            <hr />
            <div className="accordion">
                {accordionReduxPageData.map(({ title, content }) => (
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
                    formType='redux'
                    state={formSelector}
                    prevCountRef={prevCountRef}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    dispatch={dispatch}
                    handleFocusTextArea={handleFocusTextArea}
                    handleChange={handleChange}
                    handleIncreaseCounter={handleIncreaseCounter}
                    handleDeacreaseCounter={handleDeacreaseCounter}
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

export default ReduxForm
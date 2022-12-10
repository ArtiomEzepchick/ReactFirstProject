import React, { useReducer, useEffect, useRef, useState } from 'react'
import Accordion from '../Accordion/Accordion'
import Form from '../Form/Form'
import Input from '../Input/Input'
import Button from '../Button/Button'
import TextArea from '../TextArea/TextArea'
import Select from '../Select/Select'
import ResultsData from '../ResultsData/ResultsData'
import Loader from '../Loader/Loader'
import { useWindowSize } from '../../hooks/useWindowSize'
import { standardFormReducer, initialValues } from '../../reducers/standardFormReducer/standardFormReducer'
import { STANDARD_FORM_ACTION_TYPES } from '../../reducers/standardFormReducer/standardFormActionTypes'
import { inputs, options, generateResultData } from '../../helpers/formData/formData'
import { accordionReduxPageData } from '../../helpers/accordionData/accordionData'

const {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    CHANGE_VALUE,
    FOCUS_TEXTAREA,
    RESET
} = STANDARD_FORM_ACTION_TYPES

const ReduxForm = () => {
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

    const handleChangeField = (e) => dispatch({ type: CHANGE_VALUE, payload: e.target })

    const imitateSubmitting = () => {
        setIsLoading(true)

        new Promise(res => {
            setTimeout(() => {
                setIsLoading(false)
                setIsLoaded(true)
                res()
            }, 2000)
        })
    }

    const handleReset = () => {
        setIsLoaded(false)
        dispatch({ type: RESET })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isLoaded) {
            imitateSubmitting()
        }
    }

    const showResultsBlock = () => {
        if (isLoading) return <Loader />
        if (isLoaded) return <ResultsData data={resultData} counterValue={state.count} />
    }

    const showCounterBlock = () => {
        if (!isLoaded) {
            return (
                <div className='counter-actions' style={{ userSelect: 'none' }}>
                    <h3>This is a Change Counter Block. Will be able after submitting</h3>
                </div>
            )
        }

        if (isLoaded) {
            return (
                <div className='counter-actions'>
                    <h3>Change Counter</h3>
                    <Button
                        innerText='Increase'
                        handleClick={() => dispatch({ type: INCREMENT_COUNTER })}
                    />
                    <Button
                        innerText='Decrease'
                        handleClick={() => dispatch({ type: DECREMENT_COUNTER })}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            <h1 style={{ marginTop: '1rem' }}>
                Welcome to <span className='highlight-red'>Artsiom Ezepchik's</span> first React project
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
                <Form className='form' handleSubmit={handleSubmit}>
                    <h2>Please enter some info here</h2>
                    {inputs.map(({ type, labelText, name }, index) => {
                        return <Input
                            key={labelText + index}
                            type={type}
                            labelText={labelText}
                            name={name}
                            value={state[name]}
                            handleChange={handleChangeField}
                        />
                    })}
                    <Select
                        name='carBrands'
                        value={state.carBrands}
                        handleChange={handleChangeField}
                    >
                        {options.map(({ value, label }, index) => {
                            return <option key={value + index} value={value}>{label}</option>
                        })}
                    </Select>
                    <TextArea
                        name='commentsField'
                        value={state.commentsField}
                        handleChange={handleChangeField}
                        handleFocusTextArea={handleFocusTextArea}
                    />
                    {showCounterBlock()}
                </Form>

                {showResultsBlock()}

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={handleReset}
                />

                <Button
                    handleClick={handleSubmit}
                    className='submit-button'
                    innerText='Submit'
                />
            </div>
        </div>
    )
}

export default ReduxForm
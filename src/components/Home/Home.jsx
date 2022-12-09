import React, { useReducer, useEffect, useRef } from 'react'
import Accordion from '../Accordion/Accordion'
import StandardForm from '../StandardForm/StandardForm'
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
import { accordionHomePageData } from '../../helpers/accordionData/accordionData'

const { 
    INCREMENT_COUNTER, 
    DECREMENT_COUNTER, 
    CHANGE_VALUE, 
    FOCUS_TEXTAREA, 
    IS_LOADING, 
    IS_LOADED, 
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

    const handleFocusTextArea = (e) => {
        if (e.target.value === initialValues.commentsField) return dispatch({ type: FOCUS_TEXTAREA, payload: e.target })
    }

    const handleChangeField = (e) => dispatch({ type: CHANGE_VALUE, payload: e.target })

    const imitateSubmitting = () => {
        dispatch({ type: IS_LOADING })

        new Promise(res => {
            setTimeout(() => {
                dispatch({ type: IS_LOADING })
                dispatch({ type: IS_LOADED })
                res()
            }, 2000)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!state.loaded) {
            imitateSubmitting()
        }
    }

    const showResults = () => {
        if (state.loading) return <Loader />
        if (state.loaded) return <ResultsData data={resultData} counterValue={state.count} />
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
            <div className='standard-form-container'>
                <StandardForm className='standard-form' handleSubmit={handleSubmit}>
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
                </StandardForm>
                
                {showResults()}

                <Button
                    handleClick={handleSubmit}
                    className='submit-button'
                    innerText='Submit'
                />

                <Button
                    className='reset-button'
                    innerText='Reset'
                    handleClick={() => dispatch({ type: RESET })}
                />
            </div>
        </div>
    )
}

export default Home
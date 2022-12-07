import React, { useReducer, useEffect, useRef } from 'react'
import HomeForm from '../StandardForm/StandardForm'
import Input from '../Input/Input'
import Button from '../Button/Button'
import TextArea from '../TextArea/TextArea'
import Select from '../Select/Select'
import ResultsData from '../ResultsData/ResultsData'
import { standardFormReducer, initialValues } from '../StandardForm/standardFormReducer'
import { STANDARD_FORM_ACTION_TYPES } from '../StandardForm/standardFormActionTypes'
import { inputs, options, generateResultData } from './helpers'

const { INCREMENT_COUNTER, DECREMENT_COUNTER, CHANGE_VALUE, RESET } = STANDARD_FORM_ACTION_TYPES

const Home = () => {
    const [state, dispatch] = useReducer(standardFormReducer, initialValues)
    const prevCountRef = useRef(0)
    const resultData = generateResultData(state, prevCountRef.current)

    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count])

    const handleChangeField = (e) => dispatch({ type: CHANGE_VALUE, payload: e.target })

    return (
        <div>
            <h1>Welcome to <span className='color-red'>Home</span> page</h1>
            <div className='standard-form-container'>
                <HomeForm className='standard-form'>
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
                </HomeForm>

                <ResultsData data={resultData} />

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
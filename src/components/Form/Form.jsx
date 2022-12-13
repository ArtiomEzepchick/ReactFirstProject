import React, { useEffect } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import TextArea from "../TextArea/TextArea"
import Select from "../Select/Select"
import { inputs, options } from '../../helpers/formData/formData'
import PropTypes from 'prop-types'
import './styles.css'

const Form = ({
    state,
    prevCountRef,
    handleSubmit,
    handleChange,
    handleIncreaseCounter,
    handleDecreaseCounter,
}) => {
    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count, prevCountRef])

    const CounterBlock = () => {
        return (
            <div className='form-counter-actions'>
                <h3>Change Counter</h3>
                <p>Current value: {state.count}</p>
                <Button
                    innerText='Increase'
                    handleClick={(e) => {
                        e.preventDefault()
                        handleIncreaseCounter()
                    }}
                />
                <Button
                    innerText='Decrease'
                    handleClick={(e) => {
                        e.preventDefault()
                        handleDecreaseCounter()
                    }}
                />
            </div>
        )
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Please enter some info here</h2>
            {inputs.map(({ type, labelText, name }, index) => {
                return <Input
                    className='form-input-container'
                    key={labelText + index}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
                />
            })}
            <Select
                className='form-select-container'
                name='carBrands'
                value={state.carBrands}
                handleChange={handleChange}
            >
                {options.map(({ value, label }, index) => {
                    return <option key={value + index} value={value}>{label}</option>
                })}
            </Select>
            <TextArea
                className='form-textarea'
                name='commentsField'
                placeholder='Comment here...'
                value={state.commentsField}
                handleChange={handleChange}
            />

            <CounterBlock />

            <Button
                handleClick={handleSubmit}
                innerText='Submit'
            />
        </form>
    )
}

Form.propTypes = {
    state: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool,
    prevCountRef: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleIncreaseCounter: PropTypes.func,
    handleDecreaseCounter: PropTypes.func,
    handleAsyncSubmit: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default Form
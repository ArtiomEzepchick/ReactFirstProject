import React, { useEffect } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import TextArea from "../TextArea/TextArea"
import Select from "../Select/Select"
import { inputs, options } from '../../helpers/formData/formData'
import PropTypes from 'prop-types'

const Form = ({
    state,
    isLoaded,
    prevCountRef,
    handleSubmit,
    handleChange,
    handleIncreaseCounter,
    handleDecreaseCounter,
}) => {
    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count, prevCountRef])

    const showCounterBlock = () => {
        if (isLoaded) {
            return (
                <div className='counter-actions'>
                    <h3>Change Counter</h3>
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
            <div className='counter-actions' style={{ userSelect: 'none' }}>
                <h3>This is a Change Counter Block. Will be able after submitting</h3>
            </div>
        )
    }

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2>Please enter some info here</h2>
            {inputs.map(({ type, labelText, name }, index) => {
                return <Input
                    key={labelText + index}
                    type={type}
                    labelText={labelText}
                    name={name}
                    value={state[name]}
                    handleChange={handleChange}
                />
            })}
            <Select
                name='carBrands'
                value={state.carBrands}
                handleChange={handleChange}
            >
                {options.map(({ value, label }, index) => {
                    return <option key={value + index} value={value}>{label}</option>
                })}
            </Select>
            <TextArea
                name='commentsField'
                value={state.commentsField}
                handleChange={handleChange}
            />

            {showCounterBlock()}

            <Button
                handleClick={handleSubmit}
                className='submit-button'
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
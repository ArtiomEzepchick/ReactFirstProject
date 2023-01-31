import React, { useEffect } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import TextArea from "../TextArea/TextArea"
import Select from "../Select/Select"
import { inputs, options } from '../../helpers/formHelpers/formStateManagersData'
import PropTypes from 'prop-types'
import './styles.css'

const FormForStateManagers = ({
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
                    handleClick={e => {
                        e.preventDefault()
                        handleIncreaseCounter()
                    }}
                >
                    Increase
                </Button>
                <Button
                    handleClick={e => {
                        e.preventDefault()
                        handleDecreaseCounter()
                    }}
                >
                    Decrease
                </Button>
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
            <Button handleClick={handleSubmit}>Submit</Button>
        </form>
    )
}

FormForStateManagers.propTypes = {
    state: PropTypes.object.isRequired,
    prevCountRef: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleIncreaseCounter: PropTypes.func,
    handleDecreaseCounter: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default FormForStateManagers
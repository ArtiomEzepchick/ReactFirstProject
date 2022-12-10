import React, { useEffect } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import TextArea from "../TextArea/TextArea"
import Select from "../Select/Select"
import { inputs, options } from '../../helpers/formData/formData'
import PropTypes from 'prop-types'

const Form = ({
    formType,
    state,
    isLoaded,
    setIsLoading,
    setIsLoaded,
    prevCountRef,
    handleChange,
    handleFocusTextArea,
    handleIncreaseCounter,
    handleDecreaseCounter
}) => {
    useEffect(() => {
        prevCountRef.current = state.count
    }, [state.count, prevCountRef])

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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isLoaded) {
            imitateSubmitting()
        }
    }

    const showCounterBlock = () => {
        if (isLoaded) {
            return (
                <div className='counter-actions'>
                    <h3>Change Counter</h3>
                    <Button
                        innerText='Increase'
                        handleClick={handleIncreaseCounter}
                    />
                    <Button
                        innerText='Decrease'
                        handleClick={handleDecreaseCounter}
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

    const handleChangeField = (name) => {
        if (formType === 'standard') {
            return handleChange
        }
        if (formType === 'redux') {
            return (e) => handleChange(name, e.target.value)
        }
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
                    handleChange={handleChangeField(name)}
                />
            })}
            <Select
                name='carBrands'
                value={state.carBrands}
                handleChange={handleChangeField('carBrands')}
            >
                {options.map(({ value, label }, index) => {
                    return <option key={value + index} value={value}>{label}</option>
                })}
            </Select>
            <TextArea
                name='commentsField'
                value={state.commentsField}
                handleChange={handleChangeField('commentsField')}
                handleFocusTextArea={handleFocusTextArea}
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

Form.defaultProps = {
    formType: 'standard'
}

Form.propTypes = {
    formType: PropTypes.string,
    state: PropTypes.object.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setIsLoaded: PropTypes.func.isRequired,
    prevCountRef: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    handleFocusTextArea: PropTypes.func,
    handleIncreaseCounter: PropTypes.func,
    handleDecreaseCounter: PropTypes.func
}

export default Form
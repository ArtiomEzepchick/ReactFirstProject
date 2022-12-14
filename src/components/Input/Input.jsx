import React, { forwardRef } from "react"
import PropTypes from 'prop-types'

const Input = forwardRef(({ 
    className,
    labelText,
    maxLength,  
    name, 
    placeholder,
    type, 
    value, 
    handleChange, 
    handleFocus 
}, ref) => {
    return (
        <div className={className}>
            <label>
                <span>{labelText}</span>
                <input
                    ref={ref}
                    placeholder={placeholder}
                    name={name}
                    maxLength={maxLength}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
            </label>
        </div>
    )
})

Input.propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func
}

export default Input
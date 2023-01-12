import React, { forwardRef } from "react"
import PropTypes from 'prop-types'

const Input = forwardRef(({
    className,
    children,
    inputFieldClassName,
    inputDisabled = false,
    labelText,
    maxLength,
    name,
    placeholder,
    type,
    value,
    handleChange,
    handleFocus,
    handleBlur
}, ref) => {
    return (
        <div className={className}>
            <label>
                <span>{labelText}</span>
                <input
                    className={inputFieldClassName}
                    disabled={inputDisabled}
                    maxLength={maxLength}
                    name={name}
                    ref={ref}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </label>
            {children}
        </div>
    )
})

Input.propTypes = {
    className: PropTypes.string,
    inputFieldClassName: PropTypes.string,
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
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func
}

export default Input
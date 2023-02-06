import React, { forwardRef } from "react"
import PropTypes from 'prop-types'

const TextArea = forwardRef(({ 
    autoFocus,
    className, 
    defaultValue, 
    placeholder, 
    value, 
    name, 
    handleChange,
    handleBlur
}, ref) => {
    return (
        <textarea
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            name={name}
            ref={ref}
            className={className}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
        />
    )
})

TextArea.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
}

export default TextArea
import React, { forwardRef } from "react"
import PropTypes from 'prop-types'

const TextArea = forwardRef(({ 
    className, placeholder, value, name, handleChange 
}, ref) => {
    return (
        <textarea
            name={name}
            ref={ref}
            className={className}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    )
})

TextArea.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
}

export default TextArea
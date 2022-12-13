import React from "react"
import PropTypes from 'prop-types'

const TextArea = ({ className, placeholder, value, name, handleChange }) => {
    return (
        <textarea
            name={name}
            className={className}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    )
}

TextArea.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func
}

export default TextArea
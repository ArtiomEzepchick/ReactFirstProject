import React from "react"
import PropTypes from 'prop-types'

const TextArea = ({ value, name, handleChange }) => {
    return (
        <textarea
            name={name}
            className='form-textarea'
            value={value}
            onChange={handleChange}
            placeholder='Comment here...'
        />
    )
}

TextArea.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func
}

export default TextArea
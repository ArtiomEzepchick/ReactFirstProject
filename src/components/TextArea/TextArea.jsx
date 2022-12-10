import React from "react"
import PropTypes from 'prop-types'

const TextArea = ({ value, name, handleFocusTextArea, handleChange }) => {
    return (
        <textarea name={name} className='form-textarea' value={value} onChange={handleChange} onFocus={handleFocusTextArea}></textarea>
    )
}

TextArea.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleFocusTextArea: PropTypes.func,
    handleChange: PropTypes.func
}

export default TextArea
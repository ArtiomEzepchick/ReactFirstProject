import React from "react"

const TextArea = ({ value, name, handleFocusTextArea, handleChange }) => {
    return (
        <textarea name={name} className='form-textarea' value={value} onChange={handleChange} onFocus={handleFocusTextArea}></textarea>
    )
}

export default TextArea
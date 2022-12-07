import React from "react"

const TextArea = ({ value, handleChange, name }) => {
    return (
        <textarea name={name} className='form-textarea' value={value} onChange={handleChange}></textarea>
    )
}

export default TextArea
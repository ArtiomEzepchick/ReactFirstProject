import React from "react"

const Input = ({ value, id, labelText, type, handleChange }) => {
    const handleInputChange = e => handleChange(e)

    return (
        <div className="input-container">
            <label htmlFor={id}>{labelText}</label>
            <input
                value={value}
                id={id}
                type={type}
                onChange={handleInputChange} 
            />
        </div>
    )
}

export default Input
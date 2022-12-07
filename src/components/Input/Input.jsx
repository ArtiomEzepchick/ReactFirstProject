import React from "react"

const Input = ({ value, labelText, type, handleChange, name }) => {
    return (
        <div className="input-container">
            <label>
                {labelText}
                <input
                    name={name}
                    value={value}
                    type={type}
                    onChange={handleChange}
                />
            </label>
        </div>
    )
}

export default Input
import React from "react"

function Input(props) {
    const { value, id, labelText, type } = props
    const handleChange = e => props.handleChange(e)

    return (
        <div className="input-container">
            <label htmlFor={id}>{labelText}</label>
            <input
                value={value}
                id={id}
                type={type}
                onChange={handleChange} 
            />
        </div>
    )
}

export default Input
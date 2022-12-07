import React from "react"

const Select = ({ name, value, children, handleChange }) => {
    return (
        <select
            name={name}
            value={value}
            onChange={handleChange}
        >
            {children}
        </select>
    )
}

export default Select
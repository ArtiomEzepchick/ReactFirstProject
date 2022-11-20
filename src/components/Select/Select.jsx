import React from "react"

function Select(props) {
    const { name, value, children } = props
    const handleChange = (e) => props.handleChange(e)

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
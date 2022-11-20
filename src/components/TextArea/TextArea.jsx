import React from "react"

function TextArea(props) {
    const value = props.value
    const handleChange = e => props.handleChange(e)

    return (
        <textarea value={value} onChange={handleChange}></textarea>
    )
}

export default TextArea
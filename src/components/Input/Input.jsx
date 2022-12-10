import React from "react"
import PropTypes from 'prop-types'

const Input = ({ name, value, labelText, type, handleChange }) => {
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

Input.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    labelText: PropTypes.string,
    type: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Input
import React from "react"
import PropTypes from 'prop-types'

const Input = ({ className, name, value, labelText, type, handleChange }) => {
    return (
        <div className={className}>
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
    className: PropTypes.string,
    labelText: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Input
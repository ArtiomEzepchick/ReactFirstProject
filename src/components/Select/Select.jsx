import React from "react"
import PropTypes from 'prop-types'

const Select = ({ name, value, children, handleChange }) => {
    return (
        <select
            className="form-select"
            name={name}
            value={value}
            onChange={handleChange}
        >
            {children}
        </select>
    )
}

Select.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func
}

export default Select
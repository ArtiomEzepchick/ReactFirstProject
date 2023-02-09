import React from "react"
import PropTypes from "prop-types"

const Select = ({ className, name, value, children, handleChange }) => {
    return (
        <select
            className={className}
            name={name}
            value={value}
            onChange={handleChange}
        >
            {children}
        </select>
    )
}

Select.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func
}

export default Select
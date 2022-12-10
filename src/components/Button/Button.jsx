import React from "react"
import PropTypes from 'prop-types'

const Button = ({ className, type, innerText, handleClick }) => {
    return (
        <button
            className={className}
            onClick={handleClick}
            type={type}
        >
            {innerText}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    innerText: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

export default Button
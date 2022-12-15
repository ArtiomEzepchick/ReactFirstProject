import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'

const Button = ({ className, type, innerText, handleClick, isLoading }) => {
    return (
        <button
            className={classNames('button', isLoading && "blocked", className)}
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
import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'

const Button = ({ className, type, children, handleClick, isLoading }) => {
    return (
        <button
            className={classNames('button', isLoading && "blocked", className)}
            onClick={handleClick}
            type={type}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    handleClick: PropTypes.func
}

export default Button
import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'

const Button = ({ children, className, icon, isLoading, type, handleClick }) => {
    return (
        <button
            className={classNames('button', isLoading && "blocked", className)}
            onClick={handleClick}
            type={type}
        >
            {children}
            {icon}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    handleClick: PropTypes.func
}

export default Button
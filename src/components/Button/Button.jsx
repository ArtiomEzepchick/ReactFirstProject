import React from "react"
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './styles.css'

const Button = ({ 
    children, 
    className, 
    icon, 
    isLoading, 
    type, 
    handleClick = null, 
    handleMouseDown = null
}) => {
    return (
        <button
            className={classNames('button', isLoading && "blocked", className)}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            type={type}
        >
            {children}
            {icon}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.object,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    handleClick: PropTypes.func,
    handleMouseDown: PropTypes.func
}

export default Button
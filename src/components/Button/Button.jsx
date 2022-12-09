import React from "react"

const Button = ({ className, type, innerText, handleClick }) => {
    return (
        <>
            <button
                className={className}
                onClick={handleClick}
                type={type}
            >
                {innerText}
            </button>
        </>
    )
}

export default Button
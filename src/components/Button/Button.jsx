import React from "react"

function Button(props) {
    const handleClick = (e) => {
        e.preventDefault()
        return props.handleClick()
    }

    return (
        <>
            <button
                className={props.className}
                onClick={handleClick}
                type={props.type}
            >
                {props.innerText}
            </button>
        </>
    )
}

export default Button
import React from "react"

const Form = ({ className, children, handleSubmit }) => {
    return(
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export default Form
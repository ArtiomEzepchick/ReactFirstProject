import React from "react"

const StandardForm = ({ className, children, handleSubmit }) => {
    return(
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}

export default StandardForm
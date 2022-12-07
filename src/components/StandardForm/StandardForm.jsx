import React from "react"

const StandardForm = ({ className, children }) => {
    return(
        <form className={className}>
            {children}
        </form>
    )
}

export default StandardForm
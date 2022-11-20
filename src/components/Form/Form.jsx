import React from "react"

function Form(props) {
    return(
        <form className={props.className}>
            {props.children}
        </form>
    )
}

export default Form
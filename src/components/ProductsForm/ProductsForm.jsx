import React from "react"

function ProductsForm(props) {
    return(
        <form className={props.className}>
            {props.children}
        </form>
    )
}

export default ProductsForm
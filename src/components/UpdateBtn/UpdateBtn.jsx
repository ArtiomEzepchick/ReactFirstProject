import React from "react"

function UpdateBtn(props) {
    const handleClick = () => props.onBtnClick()

    return (
        <div className="update-button-container">
            <button className="update-button" onClick={handleClick}>Update list</button>
        </div>
    )
}

export default UpdateBtn
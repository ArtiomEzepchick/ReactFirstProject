import React from "react"

function UpdateBtn(props) {
    const handleClick = () => props.onBtnClick()

    return (
        <div className="updateBtn-container">
            <button className="updateBtn" onClick={handleClick}>Update list</button>
        </div>
    )
}

export default UpdateBtn
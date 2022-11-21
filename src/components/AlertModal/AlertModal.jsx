import React from "react";

export const AlertModal = ({ text, handleCloseModal }) => {
    return (
        <div className="modal-container">
            <div>
                <h1>
                    {text}
                </h1>
            </div>
            <div className="modal-actions">
                <button onClick={handleCloseModal}>
                    Close Modal Window
                </button>
            </div>
        </div>
    )
}
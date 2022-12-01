import React, { useRef, useEffect } from "react";
import classNames from "classnames"

const AlertModal = ({ headerText, contentText, handleCloseModal, isOpen, handleReturn }) => {
    const root = document.getElementById('root')
    const modal = document.getElementById('modal')
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal()
            }
        }
        
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside)
    }, [modalRef, handleCloseModal])


    if (isOpen) {
        root.classList.add('disabled')
        modal.classList.add('show')
    } else {
        root.classList.remove('disabled')
        modal.classList.remove('show')
    }

    return (
        <div className={classNames("modal-container", !isOpen && 'hidden')} ref={modalRef}>
            <div>
                <h1>{headerText}</h1>
                <p>{contentText}</p>
            </div>
            <div className={"modal-actions"}>
                <button onClick={handleCloseModal}>Ok</button>
                {handleReturn && <button onClick={handleReturn}>Return to edit</button>}
            </div>
        </div>
    )
}

export default AlertModal
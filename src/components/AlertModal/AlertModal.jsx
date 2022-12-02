import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import MODAL_TYPES from "./modalTypes";

const AlertModal = ({
    headerText,
    contentText,
    handleCloseModal,
    isOpen,
    handleReturn,
    modalType,
    clearForm
}) => {
    const root = document.getElementById('root')
    const modal = document.getElementById('modal')
    const body = document.querySelector('body')
    const modalRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal()
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside)
    }, [modalRef, handleCloseModal, modalType, clearForm])

    const handleCloseSuccessModal = () => {
        root.classList.remove('disabled')
        modal.classList.remove('show')
        clearForm()

        return navigate('/users')
    }

    if (isOpen) {
        body.classList.add('disabled')
        root.classList.add('disabled')
        modal.classList.add('show')
    } else {
        root.classList.remove('disabled')
        body.classList.remove('disabled')
        modal.classList.remove('show')
    }

    return (
        <div data-type={modalType} className={classNames("modal-container", !isOpen && 'hidden')} ref={modalRef}>
            <div>
                <h1>{headerText}</h1>
                <p>{contentText}</p>
            </div>
            <div className={"modal-actions"}>
                <button onClick={modalType === MODAL_TYPES.SUCCESS ? handleCloseSuccessModal : handleCloseModal}>Ok</button>
                {handleReturn && <button onClick={handleReturn}>Return to edit</button>}
            </div>
        </div>
    )
}

export default AlertModal
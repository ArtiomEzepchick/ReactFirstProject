import React, { useRef, useEffect } from "react"
import classNames from "classnames"
import MODAL_TYPES from "./modalTypes"
import PropTypes from 'prop-types'
import Overlay from "../Overlay/Overlay"
import Button from "../Button/Button"
import './styles.css'

const AlertModal = ({
    headerText,
    contentText,
    isOpen,
    modalType,
    handleReturn,
    handleCloseModal,
    handleCloseSuccessModal
}) => {
    const modalRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             handleCloseModal()
    //         }
    //     }

    //     document.addEventListener('click', handleClickOutside);

    //     return () => document.removeEventListener('click', handleClickOutside)
    // }, [modalRef, handleCloseModal])

    return (
        <div className={classNames('modal-container', isOpen && 'show-modal')}>
            <Overlay />
            <div data-type={modalType} className={classNames("modal", "flex-all-centered")} ref={modalRef}>
                <div>
                    <h1>{headerText}</h1>
                    <p>{contentText}</p>
                </div>
                <div className={"modal-actions"}>
                    <Button
                        innerText='Ok'
                        handleClick={modalType === MODAL_TYPES.SUCCESS ? handleCloseSuccessModal : handleCloseModal}
                    />
                    {modalType !== MODAL_TYPES.SUCCESS && <Button innerText="Return to edit" handleClick={handleReturn} />}
                </div>
            </div>
        </div>
    )
}

AlertModal.propTypes = {
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    handleReturn: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleCloseSuccessModal: PropTypes.func
}

export default AlertModal
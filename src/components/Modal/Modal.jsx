import React, { useRef, useEffect } from "react"
import classNames from "classnames"
import { useScrollLock } from "../../hooks/useScrollLock"
import MODAL_TYPES from "./modalTypes"
import PropTypes from 'prop-types'
import Overlay from "../Overlay/Overlay"
import Button from "../Button/Button"
import './styles.css'

const Modal = ({
    headerText,
    contentText,
    isModalOpen,
    modalType,
    handleReturn,
    handleCloseModal,
    handleOutsideClick
}) => {
    const modalRef = useRef(null)
    const { lockScroll, unlockScroll } = useScrollLock()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleOutsideClick()
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside)
    }, [modalRef, handleOutsideClick])

    isModalOpen ? lockScroll() : unlockScroll()

    return (
        <Overlay isModalOpen={isModalOpen}>
            <div className={classNames('modal-container', isModalOpen && 'show')}>
                <div data-type={modalType} className={classNames("modal", "flex-all-centered")} ref={modalRef}>
                    <div>
                        <h1>{headerText}</h1>
                        <p>{contentText}</p>
                    </div>
                    {modalType !== MODAL_TYPES.SUCCESS && <div className={"modal-actions"}>
                        <Button
                            innerText='Ok'
                            handleClick={handleCloseModal}
                        />
                        <Button innerText="Return to edit" handleClick={handleReturn} />
                    </div>}
                </div>
            </div>
        </Overlay>
    )
}

Modal.propTypes = {
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    isModalOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    handleReturn: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleOutsideClick: PropTypes.func
}

export default Modal
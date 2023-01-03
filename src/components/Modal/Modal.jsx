import React, { useRef, useEffect } from "react"
import * as ReactDOM from "react-dom"
import classNames from "classnames"
import { useScrollLock } from "../../hooks/useScrollLock"
import PropTypes from 'prop-types'
import Overlay from "../Overlay/Overlay"
import './styles.css'

const Modal = ({
    headerText,
    contentText,
    children,
    isModalOpen,
    modalType,
    handleCloseModal,
}) => {
    const modalRef = useRef(null)
    const { lockScroll, unlockScroll } = useScrollLock()

    useEffect(() => {
        isModalOpen ? lockScroll() : unlockScroll()

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseModal()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [modalRef, handleCloseModal, isModalOpen, lockScroll, unlockScroll])

    return (
        isModalOpen && ReactDOM.createPortal(
            <Overlay isModalOpen={isModalOpen}>
                <div className={'modal-container'}>
                    <div data-type={modalType} className={classNames("modal-window", "flex-all-centered")} ref={modalRef}>
                        <div>
                            <h1>{headerText}</h1>
                            <p>{contentText}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </Overlay>,
            document.getElementById('modal'))
    )
}

Modal.propTypes = {
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    isModalOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    handleReturn: PropTypes.func,
    handleOutsideClick: PropTypes.func
}

export default Modal
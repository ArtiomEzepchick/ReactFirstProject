import React, { useRef, useEffect, useContext } from "react"
import * as ReactDOM from "react-dom"
import classNames from "classnames"
import { useScrollLock } from "../../hooks/useScrollLock"
import PropTypes from 'prop-types'
import Overlay from "../Overlay/Overlay"
import MODAL_TYPES from "./modalTypes"
import { OrientationContext } from "../../contexts/orientationContext/OrientationContext"
import './styles.css'

const Modal = ({
    darkMode,
    headerText,
    contentText,
    children,
    isModalOpen,
    modalType,
    handleCloseModal,
}) => {
    const modalRef = useRef(null)
    const { state: { isHorizontal } } = useContext(OrientationContext)
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
            <Overlay isModalOpen={isModalOpen} darkMode={darkMode}>
                <div className={'modal-container'}>
                    <div
                        data-type={modalType}
                        className={classNames("modal-window", "flex-all-centered", !isHorizontal && 'moved')}
                        ref={modalRef}
                    >
                        <div>
                            <h1>{headerText}</h1>
                            <p>{contentText}</p>
                        </div>
                        {modalType !== MODAL_TYPES.SUCCESS && children}
                    </div>
                </div>
            </Overlay>,
            document.getElementById('modal'))
    )
}

Modal.propTypes = {
    darkMode: PropTypes.bool,
    headerText: PropTypes.string,
    contentText: PropTypes.string,
    isModalOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string,
    handleReturn: PropTypes.func,
}

export default Modal
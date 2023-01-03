import React, { useContext, useReducer, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Input from "../Input/Input"
import Modal from "../Modal/Modal"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { inputs } from "../../helpers/registerFormData/registerFormData"
import { initialValues, registerFormReducer, REGISTER_FORM_ACTION_TYPES } from "../../reducers/registerFormReducer/registerFormReducer"
import './styles.css'

const { CHANGE_VALUE, RESET } = REGISTER_FORM_ACTION_TYPES

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [state, dispatchForm] = useReducer(registerFormReducer, initialValues)
    const {
        state: {
            modalSettings: { modalType, headerText, contentText },
        },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const openRegisterModal = () => {
        setIsModalOpen(true)

        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.REGISTER_FORM,
                headerText: 'Register Form',
                contentText: 'Enter your info'
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
    }

    return (
        <header className={classNames('layout-header', !isHorizontal && 'vertical', darkMode && 'dark')}>
            <nav className={classNames('nav-panel', !isHorizontal && 'vertical', darkMode && 'dark')}>
                <div className={classNames('links-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    {links.map(({ label, href }, index) => {
                        return (
                            <Link
                                key={label + index}
                                href={href}
                                label={label}
                            />
                        )
                    })}
                </div>

                <div className={classNames('login-buttons-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    <Button handleClick={openRegisterModal}>Register</Button>
                    <Button>Login</Button>
                </div>

                <div className={classNames('toggle-buttons-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    <Button className='toggle-button' handleClick={handleChangeOrientation}>
                        {isHorizontal ? 'Move panel to the left' : 'Move panel to the top'}
                    </Button>
                    <Button className='toggle-button' handleClick={handleChangeTheme}>Change Theme</Button>
                </div>
            </nav>
            <Modal
                headerText={headerText}
                contentText={contentText}
                modalType={modalType}
                isModalOpen={isModalOpen}
                handleCloseModal={() => closeModal(setIsModalOpen)}
            >
                <form>
                    {inputs.map(({ type, labelText, name }, index) => {
                        return <Input
                            className='form-input-container'
                            key={labelText + index}
                            type={type}
                            labelText={labelText}
                            name={name}
                            value={state[name]}
                            handleChange={(e) => dispatchForm({ type: CHANGE_VALUE, payload: e.target })}
                        />
                    })}
                </form>

                <div className={"modal-actions"}>
                    <Button handleClick={() => closeModal(setIsModalOpen)}>Close</Button>
                    <Button type='submit' handleClick={handleSubmit}>Submit</Button>
                </div>
            </Modal>
        </header>
    )
}

NavPanel.propTypes = {
    darkMode: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    handleChangeTheme: PropTypes.func,
    handleChangeOrientation: PropTypes.func
}

export default NavPanel
import React, { useContext, useState } from "react"
import { nanoid } from "nanoid"
import PropTypes from 'prop-types'
import classNames from "classnames"
import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import RegisterForm from "../RegisterForm/RegisterForm"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { useLoginFormValidator } from "../../hooks/useRegisterFormValidator"
import { useScrollLock } from "../../hooks/useScrollLock"
import './styles.css'

const initialFormState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { lockScroll, unlockScroll } = useScrollLock()
    const [form, setForm] = useState(initialFormState)
    const { name, password, email } = form
    const { errors, clearErrors, validateForm, handleBlur } = useLoginFormValidator(form)
    const {
        state: {
            modalSettings: { modalType, headerText, contentText },
        },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const openRegisterModal = () => {
        setForm(initialFormState)
        clearErrors()

        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.REGISTER_FORM,
                headerText: 'Register Form',
                contentText: 'Please fill these fields'
            }
        })

        setTimeout(() => {
            setIsModalOpen(true)
        })
    }

    const registerUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    id: nanoid()
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const data = await response.json()

            closeModal(setIsModalOpen)

            setTimeout(() => {
                setIsModalOpen(true)
                dispatchModal({
                    type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                        modalType: MODAL_TYPES.SUCCESS,
                        headerText: 'Great job!',
                        contentText: 'You successfully registered'
                    }
                })
            }, 1000)

            setTimeout(() => {
                closeModal(setIsModalOpen)
            }, 3000)
        } catch {
            throw new Error('Failed to register user')
        }
    }

    const handleCloseModal = () => {
        closeModal(setIsModalOpen)
    }

    const handleChange = async (e) => {
        const field = e.target.name

        const nextFormState = {
            ...form,
            [field]: e.target.value,
        }

        setForm(nextFormState)

        if (errors[field].dirty) {
            await validateForm({
                form: nextFormState,
                errors,
                field,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        const { isValid } = await validateForm({ form, errors, forceTouchErrors: true })

        setIsLoading(false)

        if (!isValid) return

        await registerUser()
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
                    <Button handleClick={() => openRegisterModal()}>Register</Button>
                    <Button>Login</Button>
                </div>

                <div className={classNames('toggle-buttons-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    <Button className='toggle-button' handleClick={handleChangeOrientation}>
                        {isHorizontal ? 'Move panel to the left' : 'Move panel to the top'}
                    </Button>
                    <Button className='toggle-button' handleClick={handleChangeTheme}>Change Theme</Button>
                </div>
            </nav>
            {isLoading && <Loader />}
            <Modal
                headerText={headerText}
                contentText={contentText}
                modalType={modalType}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
            >
                <RegisterForm 
                    errors={errors}
                    isLoading={isLoading}
                    state={form}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <div className={"modal-actions"}>
                    <Button handleClick={handleCloseModal}>Close</Button>
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
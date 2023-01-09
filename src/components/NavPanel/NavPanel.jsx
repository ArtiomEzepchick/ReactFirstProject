import React, { useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import PropTypes from 'prop-types'
import classNames from "classnames"
import { Switch } from "antd"
import Modal from "../Modal/Modal"
import LoginForm from "../LoginForm/LoginForm"
import Loader from "../Loader/Loader"
import RegisterForm from "../RegisterForm/RegisterForm"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { useFormValidator } from "../../hooks/useFormValidator"
import './styles.css'

const initialRegisterFormState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const initialLoginFormState = {
    name: "",
    password: ""
}

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [registerForm, setRegisterForm] = useState(initialRegisterFormState)
    const [loginForm, setLoginForm] = useState(initialLoginFormState)
    const { name, password, email } = registerForm
    const {
        errors,
        clearErrors,
        validateForm,
        validateLoginForm,
        handleBlur,
        handleFocus
    } = useFormValidator(registerForm, loginForm, setIsLoading)

    const {
        state: {
            modalSettings: { modalType, headerText, contentText },
        },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    useEffect(() => {
        const isUserExist = localStorage.getItem('username')

        isUserExist ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }, [])

    const openRegisterModal = () => {
        setRegisterForm(initialRegisterFormState)
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

    const openLoginModal = () => {
        setLoginForm(initialLoginFormState)
        clearErrors()

        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.LOGIN_FORM,
                headerText: 'Login Form',
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

            closeModal(setIsModalOpen)

            localStorage.setItem('username', registerForm.name)

            setIsLoggedIn(true)

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
            }, 2500)
        } catch {
            throw new Error('Failed to register user')
        }
    }

    const handleCloseModal = () => {
        closeModal(setIsModalOpen)
    }

    const handleRegisterFormChange = async (e) => {
        const field = e.target.name

        const nextRegisterFormState = {
            ...registerForm,
            [field]: e.target.value,
        }

        setRegisterForm(nextRegisterFormState)

        if (errors[field].dirty) {
            validateForm({
                registerForm: nextRegisterFormState,
                errors,
                field,
            })
        }
    }

    const handleLoginFormChange = (e) => {
        const field = e.target.name

        const nextLoginFormState = {
            ...loginForm,
            [field]: e.target.value,
        }

        setLoginForm(nextLoginFormState)
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        const { isValid } = await validateForm({ registerForm, errors, forceTouchErrors: true })

        if (!isValid) return

        await registerUser()
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        const { isValid } = await validateLoginForm({ loginForm, errors, forceTouchErrors: true })

        if (!isValid) return

        localStorage.setItem('username', loginForm.name)
        setIsLoggedIn(true)
        closeModal(setIsModalOpen)
    }

    const handleLogOut = () => {
        setIsLoading(true)
        localStorage.removeItem('username')
        setTimeout(() => {
            setIsLoading(false)
            setIsLoggedIn(false)
        }, 1000)
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

                {isLoggedIn
                    ? <Button handleClick={handleLogOut}>Log Out</Button>
                    : <div className={classNames('login-buttons-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                        <Button handleClick={openRegisterModal}>Register</Button>
                        <Button handleClick={openLoginModal}>Login</Button>
                    </div>}

                <div className={classNames('toggle-switches-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    <div>
                        <p>Change Orientation</p>
                        <Switch className="switch" size='small' onClick={handleChangeOrientation} />
                    </div>
                    <div>
                        <p>Change theme</p>
                        <Switch className="switch" size='small' onClick={handleChangeTheme} />
                    </div>
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
                {modalType === MODAL_TYPES.REGISTER_FORM
                    ? <RegisterForm
                        errors={errors}
                        isLoading={isLoading}
                        state={registerForm}
                        handleChange={handleRegisterFormChange}
                        handleBlur={handleBlur}
                        handleFocus={handleFocus}
                        handleCloseModal={handleCloseModal}
                        handleSubmit={handleRegisterSubmit}
                    />
                    : <LoginForm
                        errors={errors}
                        isLoading={isLoading}
                        state={loginForm}
                        handleChange={handleLoginFormChange}
                        handleFocus={(e) => handleFocus(e, 'login')}
                        handleCloseModal={handleCloseModal}
                        handleSubmit={handleLoginSubmit}
                    />}
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
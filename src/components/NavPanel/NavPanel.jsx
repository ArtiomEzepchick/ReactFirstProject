import React, { useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import PropTypes from 'prop-types'
import classNames from "classnames"
import { useFormValidator } from "../../hooks/useFormValidator"
import { Switch } from "antd"
import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import FormForUser from "../FormForUser/FormForUser"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { loginFormData, registerFormData, userProfileData } from "../../helpers/formHelpers/formUsersData" 
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

    useEffect(() => {
        const handleOutsideSettingsClick = (e) => {
            const target = e.target
            const userIcon = document.querySelector('.fa-circle-user')
            const userActions = document.querySelector('.user-actions')
            const settingsIcon = document.querySelector('.fa-sliders')
            const switches = document.querySelector('.switches-container')

            if (userIcon) {
                if (target === userIcon) {
                    userActions.classList.toggle('show')
                } else if (!target.closest('.user-actions')) {
                    userActions.classList.remove('show')
                }
            }

            if (target === settingsIcon) {
                switches.classList.toggle('show')
            } else if (!target.closest('.switches-container')) {
                switches.classList.remove('show')
            }
        }

        document.addEventListener('click', handleOutsideSettingsClick)

        return () => document.removeEventListener('click', handleOutsideSettingsClick)
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
            await fetch('http://localhost:3001/users', {
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

    const openUserProfile = () => {
        setIsModalOpen(true)

        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.USER_PROFILE,
                headerText: `Hello, man`,
                contentText: 'Welcome'
            }
        })
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
                    ? <div className={classNames("user-block-container", !isHorizontal && 'vertical')}>
                        <i className="fa-regular fa-circle-user"></i>
                        <div className="user-actions">
                            <Button handleClick={openUserProfile}>
                                Profile
                                <i className="fa-solid fa-gear"></i>
                            </Button>
                            <Button handleClick={handleLogOut}>
                                Logout
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </Button>
                        </div>
                    </div>

                    : <div className={classNames('login-buttons-container', !isHorizontal && 'vertical')}>
                        <Button handleClick={openRegisterModal}>
                            Register
                            <i className="fa-solid fa-address-card"></i>
                        </Button>
                        <Button handleClick={openLoginModal}>
                            Login
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </Button>
                    </div>
                }

                <div className={classNames("settings-container", !isHorizontal && 'vertical')}>
                    <i className="fa-solid fa-sliders"></i>
                    <div className='switches-container'>
                        <div>
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                            <p>Change orientation</p>
                            <Switch className="switch" size='small' onClick={handleChangeOrientation} />
                        </div>
                        <div>
                            <i className="fa-solid fa-moon"></i>
                            <p>Change theme</p>
                            <Switch className="switch" size='small' onClick={handleChangeTheme} />
                        </div>
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
                {modalType === MODAL_TYPES.REGISTER_FORM && <FormForUser
                    errors={errors}
                    isLoading={isLoading}
                    inputs={registerFormData}
                    state={registerForm}
                    submitButtonText='Submit'
                    handleChange={handleRegisterFormChange}
                    handleBlur={handleBlur}
                    handleFocus={handleFocus}
                    handleCloseModal={handleCloseModal}
                    handleSubmit={handleRegisterSubmit}
                />}

                {modalType === MODAL_TYPES.LOGIN_FORM && <FormForUser
                    errors={errors}
                    isLoading={isLoading}
                    inputs={loginFormData}
                    state={loginForm}
                    submitButtonText='Login'
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
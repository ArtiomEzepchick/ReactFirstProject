import React, { useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useFormValidator } from "../../hooks/useFormValidator"
import { Switch } from "antd"
import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import SignUser from "../SignUser/SignUser"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import { UserContext } from "../../contexts/userContext/userContext"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { loginFormData, registerFormData } from "../../helpers/formHelpers/formInputsData"
import { getUser } from "../../helpers/requests/getUser"
import "./styles.css"

const initialRegisterFormState = {
    name: "",
    nickname: "",
    email: "",
    password: "",
}

const initialLoginFormState = {
    email: "",
    password: ""
}

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [registerForm, setRegisterForm] = useState(initialRegisterFormState)
    const [loginForm, setLoginForm] = useState(initialLoginFormState)
    const {
        errors,
        clearErrors,
        validateForm,
        handleBlur,
        handleFocus
    } = useFormValidator(registerForm, loginForm, setIsLoading)

    const {
        state: { modalSettings: { modalType, headerText, contentText } },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const {
        state: { nickname: profileNickname }, dispatch: dispatchNickname
    } = useContext(UserContext)

    const isUserLoggedIn = localStorage.getItem("nickname")

    useEffect(() => {
        if (isUserLoggedIn) {
            dispatchNickname({ type: REDUCER_TYPES.SET_NICKNAME, payload: isUserLoggedIn })
        }
    }, [isUserLoggedIn, dispatchNickname])

    useEffect(() => {
        const handleOutsideSettingsClick = (e) => {
            const target = e.target
            const userIcon = document.querySelector(".fa-circle-user")
            const userActions = document.querySelector(".user-actions")
            const settingsIcon = document.querySelector(".fa-sliders")
            const switches = document.querySelector(".switches-container")

            if (userIcon) {
                if (target === userIcon) {
                    userActions.classList.toggle("show")
                } else if (!target.closest(".user-actions")) {
                    userActions.classList.remove("show")
                }
            }

            if (target === settingsIcon) {
                switches.classList.toggle("show")
            } else if (!target.closest(".switches-container")) {
                switches.classList.remove("show")
            }
        }

        document.addEventListener("click", handleOutsideSettingsClick)

        return () => document.removeEventListener("click", handleOutsideSettingsClick)
    }, [])

    const openRegisterModal = () => {
        setRegisterForm(initialRegisterFormState)
        clearErrors()

        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.REGISTER_FORM,
                headerText: "Register Form",
                contentText: "Please fill these fields"
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
                headerText: "Login Form",
            }
        })

        setIsModalOpen(true)
    }

    const registerUser = async () => {
        const { name, nickname, password, email } = registerForm

        try {
            await fetch("http://localhost:3001/users", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    nickname,
                    password,
                    email,
                    id: nanoid()
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })

            closeModal(setIsModalOpen)

            localStorage.setItem("nickname", registerForm.nickname)

            setTimeout(() => {
                setIsModalOpen(true)
                dispatchModal({
                    type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                        modalType: MODAL_TYPES.SUCCESS,
                        headerText: "Great job!",
                        contentText: "You successfully registered"
                    }
                })
            }, 1000)

            setTimeout(() => {
                closeModal(setIsModalOpen)
            }, 2500)
        } catch {
            throw new Error("Failed to register user")
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
                form: nextRegisterFormState,
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
        const { isValid } = await validateForm({ form: registerForm, errors, forceTouchErrors: true })
        if (!isValid) return

        await registerUser()
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = await validateForm({ form: loginForm, errors, forceTouchErrors: true, type: "login" })
        if (!isValid) return

        const response = await getUser("email", loginForm.email)
        const user = await response.json()

        localStorage.setItem("nickname", user[0].nickname)
        closeModal(setIsModalOpen)
    }

    const handleLogOut = () => {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setIsModalOpen(true)
            localStorage.removeItem("nickname")
            dispatchNickname({ type: REDUCER_TYPES.SET_NICKNAME, payload: "" })
            dispatchModal({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.SUCCESS,
                    headerText: "Come back soon!"
                }
            })
        }, 1000)

        setTimeout(() => {
            closeModal(setIsModalOpen)
        }, 2500)
    }

    const formProps = {
        errors,
        isLoading,
        handleCloseModal,
        handleBlur,
        handleFocus
    }

    if (modalType === MODAL_TYPES.REGISTER_FORM) {
        formProps.inputs = registerFormData
        formProps.state = registerForm
        formProps.submitButtonText = "Submit"
        formProps.handleChange = handleRegisterFormChange
        formProps.handleSubmit = handleRegisterSubmit
    }

    if (modalType === MODAL_TYPES.LOGIN_FORM) {
        formProps.inputs = loginFormData
        formProps.state = loginForm
        formProps.submitButtonText = "Login"
        formProps.handleChange = handleLoginFormChange
        formProps.handleFocus = (e) => handleFocus(e, "login")
        formProps.handleSubmit = handleLoginSubmit
    }

    return (
        <header className={classNames("layout-header", !isHorizontal && "vertical", darkMode && "dark")}>
            <nav className={classNames("nav-panel", !isHorizontal && "vertical", darkMode && "dark")}>
                <div className={classNames("links-container", "flex-all-centered", !isHorizontal && "vertical")}>
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

                {profileNickname
                    ? <div className={classNames("user-block-container", !isHorizontal && "vertical")}>
                        <i className="fa-regular fa-circle-user"></i>
                        <div className="user-actions">
                            <i className="fa-solid fa-circle-user"></i>
                            <h2>Hello, {profileNickname}!</h2>
                            <Button icon={<i className="fa-solid fa-gear"></i>}>
                                Profile
                            </Button>
                            <Button icon={<i className="fa-solid fa-right-from-bracket"></i>} handleClick={handleLogOut}>
                                Logout
                            </Button>
                        </div>
                    </div>

                    : <div className={classNames("login-buttons-container", !isHorizontal && "vertical")}>
                        <Button icon={<i className="fa-solid fa-address-card"></i>} handleClick={openRegisterModal}>
                            Register
                        </Button>
                        <Button icon={<i className="fa-solid fa-right-to-bracket"></i>} handleClick={openLoginModal}>
                            Login
                        </Button>
                    </div>
                }

                <div className={classNames("settings-container", !isHorizontal && "vertical")}>
                    <i className="fa-solid fa-sliders"></i>
                    <div className="switches-container">
                        <div>
                            <i className="fa-solid fa-border-top-left"></i>
                            <p>Change orientation</p>
                            <Switch
                                checked={!isHorizontal && true}
                                className="switch"
                                size="small"
                                onClick={handleChangeOrientation}
                            />
                        </div>
                        <div>
                            <i className="fa-solid fa-moon"></i>
                            <p>Change theme</p>
                            <Switch
                                checked={darkMode && true}
                                className="switch"
                                size="small"
                                onClick={handleChangeTheme}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            {isLoading && <Loader />}
            <Modal
                darkMode={darkMode}
                headerText={headerText}
                contentText={contentText}
                modalType={modalType}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
            >
                <SignUser
                    errors={formProps.errors}
                    isLoading={formProps.isLoading}
                    inputs={formProps.inputs}
                    state={formProps.state}
                    submitButtonText={formProps.submitButtonText}
                    handleChange={formProps.handleChange}
                    handleBlur={formProps.handleBlur}
                    handleFocus={formProps.handleFocus}
                    handleCloseModal={formProps.handleCloseModal}
                    handleSubmit={formProps.handleSubmit}
                />
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
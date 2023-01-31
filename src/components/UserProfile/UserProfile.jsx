import React, { useState, useEffect, useCallback, useContext } from "react"
import classNames from "classnames"
import Loader from "../Loader/Loader"
import { getUser, urls } from "../../helpers/requests/requests"
import { UserContext } from "../../contexts/userContext/userContext"
import { userProfileData } from "../../helpers/formHelpers/formInputsData"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Modal from "../Modal/Modal"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import MODAL_TYPES from "../Modal/modalTypes"
import { closeModal } from "../../helpers/functions/closeModal"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { useFormValidator } from "../../hooks/useFormValidator"
import "./styles.css"

const initialUserProfileState = {
    name: "",
    nickname: "",
    email: "",
    password: "",
}

const UserProfile = () => {
    const [userProfileForm, setUserProfileForm] = useState(initialUserProfileState)
    const [isLoading, setIsLoading] = useState(false)
    const [copiedUserProfile, setCopiedUserProfile] = useState()
    const [additionalUserInfo, setAdditionalUserInfo] = useState({}) 
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInputDisabled, setIsInputDisabled] = useState(true)
    const { state: { currentUser: { nickname } }, dispatch: dispatchNickname } = useContext(UserContext)
    const {
        errors,
        FORM_TYPES,
        clearErrors,
        validateForm,
        handleBlur,
        handleFocus
    } = useFormValidator({ userProfileForm }, setIsLoading)

    const {
        state: { modalSettings: { modalType, headerText, contentText } },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const fetchUser = useCallback(async () => {
        try {
            if (nickname) {
                const userProfile = {}
                setIsLoading(true)

                const response = await getUser('nickname', nickname)
                const data = await response.json()

                for (let key in data[0]) {
                    if (key !== 'id' && key !== 'registerDate') {
                        userProfile[key] = data[0][key]
                    }
                }

                setUserProfileForm(userProfile)
                setCopiedUserProfile(userProfile)
                setAdditionalUserInfo({
                    id: data[0].id,
                    registerDate: data[0].registerDate
                })
                setIsLoading(false)
            }
        } catch {
            throw new Error('Failed to get user')
        } finally {
            setIsLoading(false)
        }
    }, [nickname])

    useEffect(() => {
        fetchUser()
        setIsInputDisabled(true)

        return setUserProfileForm(initialUserProfileState)
    }, [fetchUser])

    const checkAreObjValuesEqual = (firstObj, secondObj) => {
        let equal = true

        for (let key in firstObj) {
            if (firstObj[key] !== secondObj[key]) {
                equal = false
            }
        }

        return equal
    }

    const handleInputChange = async (e) => {
        const field = e.target.name

        const nextFormState = {
            ...userProfileForm,
            [field]: e.target.value,
        }

        setUserProfileForm(nextFormState)
    }

    const handleChangeButtonClick = (e) => {
        e.preventDefault()

        setIsInputDisabled(!isInputDisabled)
    }

    const handleResetForm = (e) => {
        e.preventDefault()

        clearErrors()
        setIsInputDisabled(!isInputDisabled)
        setUserProfileForm(copiedUserProfile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { isValid } = await validateForm({
            previousNickname: copiedUserProfile.nickname,
            previousEmail: copiedUserProfile.email,
            errors,
            forceTouchErrors: true,
            form: userProfileForm,
            type: FORM_TYPES.PROFILE
        })

        if (!isValid) return

        if (checkAreObjValuesEqual(copiedUserProfile, userProfileForm)) {
            setIsModalOpen(true)

            dispatchModal({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.ALERT,
                    headerText: "Nothing changed",
                    contentText: "You can't submit the same data"
                }
            })

            return
        }

        setIsLoading(true)

        await fetch(`${urls.users}/${additionalUserInfo.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: userProfileForm.name,
                nickname: userProfileForm.nickname,
                password: userProfileForm.password,
                email: userProfileForm.email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })

        localStorage.setItem('nickname', userProfileForm.nickname)
        clearErrors()
        setIsLoading(false)
        setIsInputDisabled(!isInputDisabled)
        setIsModalOpen(true)

        dispatchNickname({ type: REDUCER_TYPES.SET_NICKNAME, payload: userProfileForm.nickname })
        dispatchModal({
            type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                modalType: MODAL_TYPES.SUCCESS,
                headerText: "Success!",
                contentText: "You changed your data"
            }
        })

        setTimeout(() => {
            closeModal(setIsModalOpen)
        }, 2000)
    }

    return (
        <section className="user-profile-section">
            {nickname
                ? <React.Fragment>
                    <i className="fa-solid fa-circle-user"></i>
                    <h1>{nickname}'s profile</h1>
                    <h2>Registered: {additionalUserInfo.registerDate}</h2>
                    {isLoading && <Loader />}
                    <form className={classNames('form-main-container', isLoading && 'blocked')}>
                        {userProfileData.map(({ type, labelText, name }, index) => {
                            return (<Input
                                key={labelText + index}
                                className={classNames('form-input-container')}
                                inputFieldClassName={classNames(
                                    errors[name].dirty && errors[name].error && 'form-field-error',
                                    isInputDisabled && 'blocked'
                                )}
                                isInputDisabled={isInputDisabled}
                                type={type}
                                labelText={labelText}
                                name={name}
                                value={userProfileForm[name]}
                                handleChange={handleInputChange}
                                handleBlur={(e) => handleBlur(e, FORM_TYPES.PROFILE)}
                                handleFocus={(e) => handleFocus(e, FORM_TYPES.PROFILE)}
                            >
                                {errors[name].dirty && errors[name].error
                                    ? <p className='form-field-error-message'>{errors[name].message}</p>
                                    : null
                                }
                            </Input>)
                        })}
                        {isInputDisabled
                            ? <Button handleClick={handleChangeButtonClick}>Change</Button>
                            : <div className="form-actions">
                                <Button handleClick={handleResetForm}>Cancel</Button>
                                <Button handleClick={handleSubmit}>Submit</Button>
                            </div>}
                    </form>
                </React.Fragment>

                : <h1 className="unsigned-message flex-all-centered highlight-blue">You must be logged in to change your data</h1>
            }
            <Modal
                headerText={headerText}
                contentText={contentText}
                modalType={modalType}
                isModalOpen={isModalOpen}
                handleCloseModal={() => closeModal(setIsModalOpen)}
            >
                {modalType !== MODAL_TYPES.SUCCESS && <div className={"modal-actions"}>
                    <Button handleClick={() => closeModal(setIsModalOpen)}>Return</Button>
                </div>}
            </Modal>
        </section>
    )
}

export default UserProfile
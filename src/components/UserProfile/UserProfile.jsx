import React, { useState, useEffect, useCallback, useContext } from "react"
import classNames from "classnames"
import Loader from "../Loader/Loader"
import { getUser } from "../../helpers/requests/getUser"
import { UserContext } from "../../contexts/userContext/userContext"
import { userProfileData } from "../../helpers/formHelpers/formInputsData"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useFormValidator } from "../../hooks/useFormValidator"
import "./styles.css"

const initialUserProfileState = {
    name: "",
    nickname: "",
    email: "",
    password: "",
}

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userProfileForm, setUserProfileForm] = useState(initialUserProfileState)
    const [userId, setUserId] = useState()
    const [isInputDisabled, setIsInputDisabled] = useState(true)
    const { state: { currentUser: { nickname } } } = useContext(UserContext)
    const {
        errors,
        clearErrors,
        validateForm,
        handleBlur,
        handleFocus
    } = useFormValidator({ userProfileForm }, setIsLoading)

    const userProfile = {}

    const fetchUser = useCallback(async () => {
        try {
            if (nickname) {
                setIsLoading(true)

                const response = await getUser('nickname', nickname)
                const data = await response.json()

                for (let key in data[0]) {
                    if (key !== 'id') {
                        userProfile[key] = data[0][key]
                    }
                }

                setUserProfileForm(userProfile)
                setUserId(data[0].id)
                setIsLoading(false)
            }
        } catch {
            throw new Error('Failed to get posts')
        } finally {
            setIsLoading(false)
        }
    }, [nickname])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const handleInputChange = async (e) => {
        const field = e.target.name

        const nextFormState = {
            ...userProfileForm,
            [field]: e.target.value,
        }

        setUserProfileForm(nextFormState)

        if (errors[field].dirty) {
            await validateForm({
                form: nextFormState,
                errors,
                field,
            })
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault()

        setIsInputDisabled(!isInputDisabled)
    }

    return (
        <section className="user-profile-section">
            {nickname
                ? <React.Fragment>
                    <i className="fa-solid fa-circle-user"></i>
                    <h1>{nickname}'s profile</h1>
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
                                handleBlur={handleBlur}
                                handleFocus={(e) => handleFocus(e, 'profile')}
                            >
                                {errors[name].dirty && errors[name].error
                                    ? <p className='form-field-error-message'>{errors[name].message}</p>
                                    : null
                                }
                            </Input>)
                        })}
                        {isInputDisabled ?
                            <Button handleClick={handleButtonClick}>
                                Change
                            </Button>
                            : <React.Fragment>
                                <Button >
                                    Reset
                                </Button>
                                <Button >
                                    Submit
                                </Button>
                            </React.Fragment>}
                    </form>
                </React.Fragment>

                : <h1>You must be logged in to change your data</h1>
            }
        </section>
    )
}

export default UserProfile
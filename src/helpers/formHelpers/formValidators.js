import { getUser } from "../requests/getUser"

export const nameRegisterValidator = async name => {
    if (!name) {
        return "Name is required"
    } else if (!new RegExp(/^[A-Za-z]*$/).test(name)) {
        return "Incorrect name format"
    }

    return ""
}

export const nicknameRegisterValidator = async nickname => {
    if (!nickname) {
        return "Nickname is required"
    } else if (!new RegExp(/^[A-Za-z0-9]*$/).test(nickname)) {
        return "Incorrect nickname format"
    }

    try {
        const response = await getUser('nickname', nickname)
        const user = await response.json()

        if (user.length) return "This nickname already exists"
    } catch {
        throw new Error("Failed to check nickname")
    }

    return ""
}

export const emailRegisterValidator = async email => {
    if (!email) {
        return "Email is required"
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format"
    }

    try {
        const response = await getUser('email', email)
        const user = await response.json()

        if (user.length) return "This email already exists"
    } catch {
        throw new Error("Failed to check email")
    }

    return ""
}

export const passwordRegisterValidator = password => {
    if (!password) {
        return "Password is required"
    } else if (password.length <= 7) {
        return "Password must have a minimum 8 characters"
    }

    return ""
}

export const emailLoginValidator = async (email) => {
    if (!email) return "Email is required"
    try {
        const response = await getUser('email', email)
        const user = await response.json()

        return !user.length ? "Wrong email" : ""
    } catch {
        throw new Error("Failed to check email")
    }
}

export const passwordLoginValidator = async (password, email) => {
    if (!password) return "Password is required"
    try {
        const response = await getUser('email', email)
        const user = await response.json()

        if (user.length) {
            return password !== user[0].password ? "Password is wrong" : ""
        } else {
            return "Check email field"
        }
    } catch {
        throw new Error("Failed to check password")
    }
}

export const registerValidators = async (fieldName, field) => {
    switch (fieldName) {
        case 'name':
            return nameRegisterValidator(field)
        case 'nickname':
            return await nicknameRegisterValidator(field)
        case 'email':
            return await emailRegisterValidator(field)
        case 'password':
            return passwordRegisterValidator(field)
        default:
            return
    }
}

export const loginValidators = async (fieldName, field, emailForPasswordCheck) => {
    switch (fieldName) {
        case 'email':
            return await emailLoginValidator(field)
        case 'password':
            return await passwordLoginValidator(field, emailForPasswordCheck)
        default:
            return
    }
}
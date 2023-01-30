import { getUser } from "../requests/getUser"

const nameValidator = name => {
    if (!name) {
        return "Name is required"
    } else if (!new RegExp(/^[A-Za-z]*$/).test(name)) {
        return "Incorrect name format"
    }

    return ""
}

const passwordValidator = password => {
    if (!password) {
        return "Password is required"
    } else if (password.length <= 7) {
        return "Password must have a minimum 8 characters"
    }

    return ""
}

const nicknameRegisterValidator = async nickname => {
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

const nicknameProfileValidator = async (nickname, previousNickname) => {
    if (!nickname) {
        return "Nickname is required"
    } else if (!new RegExp(/^[A-Za-z0-9]*$/).test(nickname)) {
        return "Incorrect nickname format"
    }

    try {
        const response = await getUser('nickname', nickname)
        const user = await response.json()

        if (!user.length || previousNickname === user[0].nickname ) return ""
        if (user.length) return "This nickname already exists"
    } catch {
        throw new Error("Failed to check nickname")
    }

    return ""
}  

const emailRegisterValidator = async email => {
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

const emailLoginValidator = async (email) => {
    if (!email) return "Email is required"

    try {
        const response = await getUser('email', email)
        const user = await response.json()

        return !user.length ? "Wrong email" : ""
    } catch {
        throw new Error("Failed to check email")
    }
}

const emailProfileValidator = async (email, previousEmail) => {
    if (!email) {
        return "Email is required"
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format"
    }

    try {
        const response = await getUser('email', email)
        const user = await response.json()

        if (!user.length || previousEmail === user[0].email ) return ""
        if (user.length) return "This email already exists"
    } catch {
        throw new Error("Failed to check email")
    }

    return ""
}

const passwordLoginValidator = async (password, email) => {
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

export const registerValidators = async ({ fieldName, field }) => {
    switch (fieldName) {
        case 'name':
            return nameValidator(field)
        case 'nickname':
            return await nicknameRegisterValidator(field)
        case 'email':
            return await emailRegisterValidator(field)
        case 'password':
            return passwordValidator(field)
        default:
            return
    }
}

export const loginValidators = async ({ fieldName, field, emailForPasswordCheck }) => {
    switch (fieldName) {
        case 'email':
            return await emailLoginValidator(field)
        case 'password':
            return await passwordLoginValidator(field, emailForPasswordCheck)
        default:
            return
    }
}

export const profileChangeValidators = async ({ fieldName, field, previousNickname, previousEmail }) => {
    switch (fieldName) {
        case 'name':
            return nameValidator(field)
        case 'nickname':
            return await nicknameProfileValidator(field, previousNickname)
        case 'email':
            return await emailProfileValidator(field, previousEmail)
        case 'password':
            return passwordValidator(field)
        default:
            return
    }
}
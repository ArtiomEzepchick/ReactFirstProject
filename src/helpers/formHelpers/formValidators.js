import { getUser } from "../requests/requests"

const regExps = {
    nickname: /^[A-Za-z0-9]*$/,
    email: /\S+@\S+\.\S+/
}

const fieldNames = {
    name: 'name',
    nickname: 'nickname',
    email: 'email',
    password: 'password'
}

const { name, nickname, email, password } = fieldNames

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

const fieldValidator = async (fieldName, field, regExp, previousValue) => {
    if (!field) {
        return `${fieldName[0].toUpperCase() + fieldName.slice(1)} is required`
    } else if (!new RegExp(regExp).test(field)) {
        return `Incorrect ${fieldName} format`
    }

    try {
        const response = await getUser(fieldName, field)
        const user = await response.json()

        if (previousValue) {
            if (!user.length || previousValue === user[0][fieldName] ) return ""
        }

        if (user.length) return `This ${fieldName} already exists`
    } catch {
        throw new Error(`Failed to check ${fieldName}`)
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
        case name:
            return nameValidator(field)
        case nickname:
            return await fieldValidator(fieldName, field, regExps.nickname)
        case email:
            return await fieldValidator(fieldName, field, regExps.email)
        case password:
            return passwordValidator(field)
        default:
            return
    }
}

export const loginValidators = async ({ fieldName, field, emailForPasswordCheck }) => {
    switch (fieldName) {
        case email:
            return await emailLoginValidator(field)
        case password:
            return await passwordLoginValidator(field, emailForPasswordCheck)
        default:
            return
    }
}

export const profileChangeValidators = async ({ fieldName, field, previousNickname, previousEmail }) => {
    switch (fieldName) {
        case name:
            return nameValidator(field)
        case nickname:
            return await fieldValidator(fieldName, field, regExps.nickname, previousNickname)
        case email:
            return await fieldValidator(fieldName, field, regExps.email, previousEmail)
        case password:
            return passwordValidator(field)
        default:
            return
    }
}
export const nameValidator = async name => {
    const response = await fetch('http://localhost:3001/users')
    const data = await response.json()

    for (let user of data) {
        if (name === user.name) {
            return "Such name is already exists"
        }
    }

    if (!name) {
        return "Name is required"
    } else if (!new RegExp(/^[A-Za-z0-9]*$/).test(name)) {
        return "Incorrect name format"
    }

    return ""
}

export const emailValidator = async email => {
    const response = await fetch('http://localhost:3001/users')
    const data = await response.json()

    for (let user of data) {
        if (email === user.email) {
            return "Such email is already exists"
        }
    }

    if (!email) {
        return "Email is required"
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return "Incorrect email format"
    }

    return ""
}

export const passwordValidator = password => {
    if (!password) {
        return "Password is required"
    } else if (password.length <= 7) {
        return "Password must have a minimum 8 characters"
    }

    return ""
}

export const confirmPasswordValidator = (confirmPassword, password) => {
    if (!confirmPassword) {
        return "Confirm password is required"
    } else if (confirmPassword.length <= 7) {
        return "Confirm password must have a minimum 8 characters"
    } else if (confirmPassword !== password) {
        return "Passwords do not match"
    }
    
    return ""
}
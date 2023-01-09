export const nameRegisterValidator = async name => {
    if (!name) {
        return "Name is required"
    } else if (!new RegExp(/^[A-Za-z0-9]*$/).test(name)) {
        return "Incorrect name format"
    }

    try {
        const response = await fetch("http://localhost:3001/users")
        const data = await response.json()
    
        for (let user of data) {
            if (name === user.name) {
                return "This name already exists"
            }
        }
    } catch {
        throw new Error("Failed to check name")
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
        const response = await fetch("http://localhost:3001/users")
        const data = await response.json()
    
        for (let user of data) {
            if (email === user.email) {
                return "This email already exists"
            }
        }
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

export const confirmPasswordRegisterValidator = (confirmPassword, password) => {
    if (!confirmPassword) {
        return "Confirm password is required"
    } else if (confirmPassword.length <= 7) {
        return "Confirm password must have a minimum 8 characters"
    } else if (confirmPassword !== password) {
        return "Passwords do not match"
    }
    
    return ""
}

export const nameLoginValidator = async (name) => {
    if (!name) {
        return "Name is required"
    }

    try {
        const response = await fetch("http://localhost:3001/users")
        const data = await response.json()
        let message = ""
    
        for (let user of data) {
            if (name === user.name) {
                return ""
            } else {
                message = "No such user"
            }
        }

        return message
    } catch {
        throw new Error("Failed to check name")
    }
}

export const passwordLoginValidator = async (name, password) => {
    if (!password) {
        return "Password is required"
    }

    try {
        const response = await fetch("http://localhost:3001/users")
        const data = await response.json()
        let message = ""
    
        for (let user of data) {
            if (name === user.name) {
                if (password !== user.password) {
                    return "Password is wrong"
                } else {
                    return ""
                }
            }

            if (name !== user.name) {
                message = "Check name field"
            }
        }

        return message
    } catch {
        throw new Error("Failed to check password")
    }
}
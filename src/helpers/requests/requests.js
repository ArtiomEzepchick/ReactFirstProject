import { nanoid } from "nanoid"

const urls = {
    posts: 'http://localhost:3001/posts',
    users: 'http://localhost:3001/users'
}

export const getUser = async (field, value) => {
    try {
       return await fetch(`http://localhost:3001/users?${field + "=" + value}`)
    } catch {
        throw new Error('Failed to get user')
    }
}

export const postUser = async form => {
    const { name, nickname, password, email } = form

    try {
        await fetch(urls.users, {
            method: "POST",
            body: JSON.stringify({
                name,
                nickname,
                password,
                email,
                registerDate: new Date().toLocaleDateString(),
                id: nanoid()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
    } catch {
        throw new Error("Failed to send user's data")
    }
}

export const updateUser = async (id, form) => {
    const { name, nickname, email, password } = form
    
    try {
        await fetch(`${urls.users}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name,
                nickname,
                password,
                email,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
    } catch {
        throw new Error("Failed to update user's info")
    }
}

export const getAllPosts = async () => {
    const response = await fetch(urls.posts)
    return await response.json()
}

export const getPostsFromDefinitePage = async page => {
    const response = await fetch(`${urls.posts}?_page=${page}&_limit=3`)
    return await response.json()
}

export const sendPost = async (nickname, message) => {
    try {
        const response = await fetch(urls.posts, {
            method: 'POST',
            body: JSON.stringify({
                nickname,
                message,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                date: new Date().toLocaleDateString(),
                id: nanoid()
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        return await response.json()
    } catch {
        throw new Error('Failed to send post')
    }
}

export const deleteDefinitePost = async id => {
    try {
        await fetch(`${urls.posts}/${id}`, { method: 'DELETE' })
    } catch {
        throw new Error('Failed to delete post')
    }
}
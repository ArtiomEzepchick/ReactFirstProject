import React, { useState, useEffect } from "react"
import TextArea from "../TextArea/TextArea"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import './styles.css'

const More = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [isUserAdded, setIsUserAdded] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts')
                const data = await response.json()

                setIsLoading(true)

                setTimeout(() => {
                    setPosts(data)
                    setIsLoading(false)
                }, 1500)
            } catch {
                throw new Error('Failed to get posts')
            }
        }

        fetchPost()
    }, [])

    const addPost = async (userName, message) => {
        try {
            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify({
                    userName: userName,
                    message: message,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const data = await response.json()

            setIsLoading(true)

            setTimeout(() => {
                setPosts((posts) => [...posts, data])
                setMessage('')
                setIsLoading(false)
            }, 400)
        } catch {
            throw new Error('Failed to add post')
        }
    }

    const deletePost = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })

            if (response.status === 200) {
                setIsLoading(true)

                setTimeout(() => {
                    setIsLoading(false)
                    return setPosts(posts.filter((post) => post.id !== id))
                }, 300)
            }
        } catch {
            throw new Error('Failed to delete post')
        }
    }

    const handleConfirmUserName = (e) => {
        e.preventDefault()

        if (!userName.trim()) {
            setUserName('Unknown')
            setIsUserAdded(true)
            return
        }

        setUserName(userName.trim())
        setIsUserAdded(true)
    }

    const handleChangeUserName = (e) => {
        e.preventDefault()

        setIsUserAdded(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!userName.trim()) {
            setUserName('Unknown')
            setIsUserAdded(true)
        }

        if (userName) {
            setIsUserAdded(true)
        }

        addPost(userName, message)
    }

    return (
        <div className="rest">
            <div className="add-post-container">
                <h2>Create posts here</h2>
                <form onSubmit={handleSubmit}>
                    {isUserAdded ?
                        <h3>Hello, {userName}!</h3> :
                        <Input
                            className="input-container"
                            labelText='Who are you?'
                            placeholder='Your name here'
                            type="text"
                            value={userName}
                            handleChange={(e) => setUserName(e.target.value)}
                            handleFocus={() => (userName === 'Unknown') ? setUserName('') : null}
                        />}

                    {isUserAdded ?
                        <Button innerText='Change name' handleClick={handleChangeUserName} /> :
                        <Button innerText="Confirm" handleClick={handleConfirmUserName} />}

                    <TextArea
                        placeholder="What's on your mind?"
                        className="textarea-content"
                        value={message}
                        handleChange={(e) => setMessage(e.target.value)}
                    />
                    <Button innerText="Add Post" type="submit" />
                </form>
            </div>
            <div className="posts-container">
                {isLoading && <Loader />}
                {!isLoading && posts.map((post) => {
                    return (
                        <div className="post-card" key={post.id}>
                            <h2 className="post-user-name">{post.userName ? post.userName : 'Unknown'}</h2>
                            <p className="post-message">{post.message}</p>
                            <div className="button">
                                <Button
                                    innerText="Delete"
                                    className="delete-btn"
                                    handleClick={() => deletePost(post.id)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default More
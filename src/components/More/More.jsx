import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import TextArea from "../TextArea/TextArea"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Accordion from '../Accordion/Accordion'
import Loader from "../Loader/Loader"
import classNames from 'classnames'
import { accordionMorePageData } from "../../helpers/accordionData/accordionData"
import './styles.css'

const More = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isDataEmpty, setIsDataEmpty] = useState(false)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [isUserAdded, setIsUserAdded] = useState(false)
    const [posts, setPosts] = useState([])
    const [height, setHeight] = useState(0)
    const postsRef = useRef(null)

    useLayoutEffect(() => {
        setHeight(postsRef.current.offsetHeight);
    }, [posts, height]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:3001/posts')
                const data = await response.json()

                if (!data.length) setIsDataEmpty(true)

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
        if (!message.trim()) {
            message = 'No message'
        }
        try {
            const response = await fetch('http://localhost:3001/posts', {
                method: 'POST',
                body: JSON.stringify({
                    userName: userName,
                    message: message,
                    time: new Date().toLocaleString()
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
            const response = await fetch(`http://localhost:3001/posts/${id}`, { method: 'DELETE' })

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
        }

        setIsUserAdded(true)
        addPost(userName, message)
    }

    return (
        <div className='wrapper'>
            <h1 style={{ marginTop: '1rem' }}>
                <span className='highlight-purple'>REST API</span> consume
            </h1>
            <hr />
            <div className="accordion-container">
                {accordionMorePageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <div className="rest">
                <div className="add-post-container">
                    <h2>Create posts here</h2>
                    <form onSubmit={handleSubmit}>
                        {isUserAdded ?
                            <h3>Hello, {userName}!</h3> :
                            <Input
                                className="input-container"
                                labelText='Who are you?'
                                maxLength='25'
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
                <div style={{ height: `${height}px` }}>
                    <div ref={postsRef} className={classNames("posts-container", isLoading && 'hidden')}>
                        {isLoading && <Loader />}
                        {!isLoading && posts.map((post) => {
                            return (
                                <div className="post-card" key={post.id}>
                                    <h2 className="post-user-name">{post.userName ? post.userName : 'Unknown'}</h2>
                                    <p className="post-message">{post.message}</p>
                                    <p className="post-time">{post.time}</p>
                                    <Button
                                        innerText="Delete"
                                        handleClick={() => deletePost(post.id)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default More
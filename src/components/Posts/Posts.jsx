import React, { useState, useEffect, useRef, useCallback } from "react";
import { nanoid } from "nanoid";
import * as ReactDOM from "react-dom"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import MODAL_TYPES from "../Modal/modalTypes"

import './styles.css'

const Posts = () => {
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [isUserAdded, setIsUserAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [posts, setPosts] = useState([])
    // @Todo: switch to context
    const [modalSettings, setModalSettings] = useState({
        modalType: '',
        headerText: '',
        contentText: ''
    })
    const userNameRef = useRef(null)
    const postsRef = useRef(null)

    const { modalType, headerText, contentText } = modalSettings

    const fetchPosts = useCallback(async () => {
        try {
            setIsLoading(true)

            const response = await fetch('http://localhost:3001/posts')
            const data = await response.json()

            setPosts(data)
            setIsLoading(false)
        } catch {
            throw new Error('Failed to get posts')
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const addPost = async (userName, message) => {
        if (!message.trim()) {
            // @toDo: DO NOT MUTATE FUNCTIONAL ARGUMENTS
            message = 'No message'
        }

        if (!userName.trim()) {
            setIsModalOpen(true)

            setModalSettings({
                modalType: MODAL_TYPES.ALERT,
                headerText: 'Username is empty',
                contentText: 'Your name will be Unknown'
            })
        }

        if (userName.trim()) {
            try {
                setIsLoading(true)
                setIsModalOpen(true)

                const response = await fetch('http://localhost:3001/posts', {
                    method: 'POST',
                    body: JSON.stringify({
                        userName: userName,
                        message: message,
                        time: new Date().toLocaleString(),
                        id: nanoid()
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                const data = await response.json()

                setIsUserAdded(true)

                setModalSettings({
                    modalType: MODAL_TYPES.SUCCESS,
                    headerText: 'Success',
                    contentText: 'New post added'
                })

                setPosts((posts) => [...posts, data])
                setMessage('')
                setIsLoading(false)
                setIsModalOpen(false)
            } catch {
                throw new Error('Failed to add post')
            }
        }
    }

    const deletePost = async (id) => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:3001/posts/${id}`, { method: 'DELETE' })


            if (response.status === 200) {
                setIsLoading(false)
                return setPosts(posts.filter((post) => post.id !== id))
            }
            /** @toDO:
              1. set loader to false on request fail
              2. simulate error and create a case with modal on error
            **/
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

    const handleReturnToEdit = (e) => {
        e.preventDefault()

        setIsModalOpen(false)
        setIsUserAdded(false)
        userNameRef.current.focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userName.trim()) {
            setUserName('Unknown')
        }

        await addPost(userName, message)
    }

    const handleCloseModalAndSubmit = async (e) => {
        e.preventDefault()

        setIsModalOpen(false)
        await addPost(userName, message)
    }

    return (
        <div className="manage-posts-container">
            <div className="add-post-container">
                <h2 className="highlight-blue">Create posts</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    {!isUserAdded ? <Input
                            className="input-container"
                            labelText='Who are you?'
                            placeholder='Your name here'
                            maxLength='25'
                            type="text"
                            ref={userNameRef}
                            value={userName}
                            handleChange={(e) => setUserName(e.target.value)}
                            handleFocus={() => userName === 'Unknown' && setUserName('')}
                        />
                        : <h3>Hello, {userName}!</h3>
                    }
                    {!isUserAdded ?
                        <Button innerText="Confirm" handleClick={handleConfirmUserName} /> :
                        <Button innerText='Change name' handleClick={handleChangeUserName} />}
                    <TextArea
                        placeholder="What's on your mind?"
                        className="textarea-content"
                        value={message}
                        handleChange={(e) => setMessage(e.target.value)}
                    />
                    <Button isLoading={isLoading} innerText='Send post' type='submit' />
                </form>
            </div>
            <div>
                {isLoading && <Loader />}
                <div ref={postsRef} className={classNames("posts-container", isLoading && "blocked")}>
                    <h2 className="highlight-purple">Your created posts</h2>
                    <hr />
                    {posts.map(({ id, userName, message, time }) => {
                        return (
                            <div className="post-card" key={id}>
                                <h3 className="post-user-name">{userName}</h3>
                                <p className="post-message">{message}</p>
                                <p className="post-time">Posted: {time}</p>
                                <Button
                                    className='delete-button'
                                    innerText="Delete"
                                    handleClick={() => deletePost(id)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            {ReactDOM.createPortal(
                <Modal
                    headerText={headerText}
                    contentText={contentText}
                    modalType={modalType}
                    isModalOpen={isModalOpen}
                    handleReturn={handleReturnToEdit}
                    handleCloseModal={handleCloseModalAndSubmit}
                    handleOutsideClick={() => setIsModalOpen(false)}
                />, document.getElementById('modal'))}
        </div>
    )
}

export default Posts
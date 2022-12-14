import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import * as ReactDOM from "react-dom"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Accordion from '../Accordion/Accordion'
import Loader from "../Loader/Loader"
import AlertModal from "../AlertModal/AlertModal"
import MODAL_TYPES from "../AlertModal/modalTypes"
import withIsLoadingCheck from "../../hocs/withIsLoadingCheck"
import { accordionMorePageData } from "../../helpers/accordionData/accordionData"
import './styles.css'

const modalProps = {
    modalType: null,
    headerText: null,
    contentText: null
}

let { modalType, headerText, contentText } = modalProps

const More = () => {
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [isUserAdded, setIsUserAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [posts, setPosts] = useState([])
    const [height, setHeight] = useState(0)
    const userNameRef = useRef(null)
    const postsRef = useRef(null)

    const ButtonWithIsLoadingCheck = withIsLoadingCheck(Button)

    useLayoutEffect(() => {
        setHeight(postsRef.current.offsetHeight);
    }, [posts, height]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('http://localhost:3001/posts')
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

    const changeModal = (type, header, content) => {
        modalType = type
        headerText = header
        contentText = content
    }

    const addPost = async (userName, message) => {
        if (!message.trim()) {
            message = 'No message'
        }

        if (!userName.trim()) {
            setIsModalOpen(true)

            changeModal(
                MODAL_TYPES.ALERT,
                `Username is empty`,
                'Your name will be Unknown'
            )
        }

        if (userName.trim()) {
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
                setIsUserAdded(true)

                changeModal(
                    MODAL_TYPES.SUCCESS,
                    'Success',
                    'New post added'
                )

                setTimeout(() => {
                    setPosts((posts) => [...posts, data])
                    setMessage('')
                    setIsLoading(false)
                    setIsModalOpen(true)

                    setTimeout(() => {
                        setIsModalOpen(false)
                    }, 900)
                }, 600)
            } catch {
                throw new Error('Failed to add post')
            }
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

    const handleReturnToEdit = (e) => {
        e.preventDefault()

        setIsModalOpen(false)
        setIsUserAdded(false)
        userNameRef.current.focus()
    }

    const handleCloseModalAndSubmit = (e) => {
        e.preventDefault()

        setIsModalOpen(false)
        addPost(userName, message)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!userName.trim()) {
            setUserName('Unknown')
        }

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
                    <h2 className="highlight-blue">Create posts</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        {isUserAdded ?
                            <h3>Hello, {userName}!</h3> :
                            <Input
                                className="input-container"
                                labelText='Who are you?'
                                placeholder='Your name here'
                                maxLength='25'
                                type="text"
                                ref={userNameRef}
                                value={userName}
                                handleChange={(e) => setUserName(e.target.value)}
                                handleFocus={() => userName === 'Unknown' && setUserName('')}
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
                        <ButtonWithIsLoadingCheck isLoading={isLoading} innerText='Send post' type='submit' />
                    </form>
                </div>
                <div style={{ height: `${height}px` }}>
                    {isLoading && <Loader />}
                    <div ref={postsRef} className={classNames("posts-container", isLoading && "blocked")}>
                        <h2 className="highlight-purple">Your created posts</h2>
                        <hr />
                        {posts.map((post) => {
                            return (
                                <div className="post-card" key={post.id}>
                                    <h3 className="post-user-name">{post.userName}</h3>
                                    <p className="post-message">{post.message}</p>
                                    <p className="post-time">Posted: {post.time}</p>
                                    <Button
                                        className='delete-button'
                                        innerText="Delete"
                                        handleClick={() => deletePost(post.id)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {ReactDOM.createPortal(
                <AlertModal
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

export default More
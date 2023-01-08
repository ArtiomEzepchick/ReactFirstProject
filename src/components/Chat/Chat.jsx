import React, { useState, useEffect, useRef, useCallback, useContext } from "react"
import { nanoid } from "nanoid"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Input from "../Input/Input"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import Modal from "../Modal/Modal"
import MODAL_TYPES from "../Modal/modalTypes"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { closeModal } from "../../helpers/functions/closeModal"
import './styles.css'

const Chat = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [isUserAdded, setIsUserAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const userNameRef = useRef(null)
    const messageRef = useRef(null)
    const {
        state: {
            modalSettings: { modalType, headerText, contentText },
        },
        dispatch
    } = useContext(ModalContext)

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
            setIsModalOpen(true)

            dispatch({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.ALERT,
                    headerText: 'Message field is empty',
                    contentText: 'You need to type something'
                }
            })
            
            return
        }

        if (!userName.trim()) {
            if (!userName.trim()) {
                setUserName('Unknown')
            }

            setIsModalOpen(true)

            dispatch({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.ALERT,
                    headerText: 'Your name will be Unknown',
                    contentText: 'Username field is empty'
                }
            })
        }

        if (userName.trim()) {
            try {
                setIsLoading(true)

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

                setPosts((posts) => [...posts, data])
                setMessage('')
                setIsLoading(false)
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
                setPosts(posts.filter((post) => post.id !== id))
            }

            /** @toDO:
              1. set loader to false on request fail
              2. simulate error and create a case with modal on error
            **/
        } catch {
            throw new Error('Failed to delete post')
        } finally {
            setIsLoading(false)
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

    const handleReturnToEdit = () => {
        closeModal(setIsModalOpen)

        if (!message.trim()) {
            messageRef.current.focus()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await addPost(userName, message)
    }

    return (
        <div className="manage-posts-container">
            <div className="add-post-container">
                <h2 className="highlight-blue">Create post</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    {!isUserAdded
                        ? <Input
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
                    {!isUserAdded
                        ? <Button handleClick={handleConfirmUserName}>Confirm</Button>
                        : <Button handleClick={handleChangeUserName}>Change name</Button>
                    }
                    <TextArea
                        className="textarea-content"
                        placeholder="What's on your mind?"
                        ref={messageRef}
                        value={message}
                        handleChange={(e) => setMessage(e.target.value)}
                    />
                    <Button isLoading={isLoading} type='submit'>Send post</Button>
                </form>
            </div>
            <div>
                {isLoading && <Loader />}
                <div className={classNames("posts-container", isLoading && "blocked")}>
                    <h2 className="highlight-purple">Published posts</h2>
                    <hr />
                    {!isLoading && !posts.length
                        ? <p style={{ textAlign: 'center' }}>No posts in here. You'll be the first!</p>
                        : posts.map(({ id, userName, message, time }) => {
                            return (
                                <div className="post-card" key={id}>
                                    <h3 className="post-user-name">{userName}</h3>
                                    <p className="post-message">{message}</p>
                                    <p className="post-time">Posted: {time}</p>
                                    <Button className='delete-button' handleClick={() => deletePost(id)}>Delete</Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Modal
                headerText={headerText}
                contentText={contentText}
                modalType={modalType}
                isModalOpen={isModalOpen}
                handleCloseModal={handleReturnToEdit}
            >
                {modalType !== MODAL_TYPES.SUCCESS && <div className={"modal-actions"}>
                    <Button handleClick={handleReturnToEdit}>Return to edit</Button>
                </div>}
            </Modal>
        </div>
    )
}

export default Chat
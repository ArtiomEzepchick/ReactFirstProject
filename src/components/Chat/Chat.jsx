import React, { useState, useEffect, useRef, useCallback, useContext } from "react"
import { nanoid } from "nanoid"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import { UserContext } from "../../contexts/userContext/userContext"
import { ThemeContext } from "../../contexts/themeContext/ThemeContext"
import Modal from "../Modal/Modal"
import MODAL_TYPES from "../Modal/modalTypes"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { closeModal } from "../../helpers/functions/closeModal"
import { urls } from "../../helpers/requests/requests"
import './styles.css'

const Chat = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const messageRef = useRef(null)
    const { state: { nickname } } = useContext(UserContext)
    const { state: { darkMode } } = useContext(ThemeContext)
    const {
        state: {modalSettings: { modalType, headerText, contentText } },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const fetchPosts = useCallback(async () => {
        try {
            setIsLoading(true)

            const response = await fetch(urls.posts)
            const data = await response.json()

            setPosts(data)
            setIsLoading(false)
        } catch {
            throw new Error('Failed to get posts')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const addPost = async (nickname, message) => {
        if (!message.trim()) {
            setIsModalOpen(true)

            return dispatchModal({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.ALERT,
                    headerText: 'Message field is empty',
                    contentText: 'You need to type something'
                }
            })
        }

        try {
            setIsLoading(true)

            const response = await fetch(urls.posts, {
                method: 'POST',
                body: JSON.stringify({
                    nickname,
                    message,
                    time: new Date().toLocaleString(),
                    id: nanoid()
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            const data = await response.json()

            setPosts((posts) => [...posts, data])
            setMessage('')
            setIsLoading(false)
        } catch {
            throw new Error('Failed to add post')
        } finally {
            setIsLoading(false)
        }
    }

    const deletePost = async (id) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${urls.posts}/${id}`, { method: 'DELETE' })

            if (response.status === 200) {
                setIsLoading(false)
                setPosts(posts.filter((post) => post.id !== id))
            }
        } catch {
            throw new Error('Failed to delete post')
        } finally {
            setIsLoading(false)
        }
    }

    const handleReturnToEdit = () => {
        closeModal(setIsModalOpen)

        if (!message.trim()) {
            messageRef.current.focus()
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        await addPost(nickname, message)
    }

    return (
        <div className="manage-posts-container">
            <div className="add-post-container">
                <h2 className="highlight-blue">Create post</h2>
                <hr />
                {nickname
                    ? <form onSubmit={handleSubmit}>
                        <TextArea
                            className="textarea-content"
                            placeholder={`What's on your mind, ${nickname}?`}
                            ref={messageRef}
                            value={message}
                            handleChange={e => setMessage(e.target.value)}
                        />
                        <Button isLoading={isLoading} type='submit'>Send post</Button>
                    </form>
                    : <p style={{ textAlign: 'center' }}>You must be logged in to send messages</p>
                }
            </div>
            <div>
                {isLoading && <Loader />}
                <div className={classNames("posts-container", isLoading && "blocked")}>
                    <h2 className="highlight-purple">Published posts {posts.length ? `(${posts.length})` : null}</h2>
                    <hr />
                    {!isLoading && !posts.length
                        ? <p style={{ textAlign: 'center' }}>No posts in here. You'll be the first!</p>
                        : posts.map(({ id, nickname, message, time }) => {
                            return (
                                <div className="post-card" key={id}>
                                    <i className="fa-solid fa-circle-user"></i>
                                    <h3 className="post-user-name">{nickname}</h3>
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
                darkMode={darkMode}
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
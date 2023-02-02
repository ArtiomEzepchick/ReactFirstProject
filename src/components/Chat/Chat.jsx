import React, { useState, useEffect, useRef, useCallback, useContext } from "react"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import { UserContext } from "../../contexts/userContext/userContext"
import { ThemeContext } from "../../contexts/themeContext/ThemeContext"
import { MODAL_TYPES } from "../Modal/modalTypes"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { closeModal } from "../Modal/closeModal"
import { sendPost, getAllPosts, getPostsFromDefinitePage, deleteDefinitePost } from "../../helpers/requests/requests"
import './styles.css'

const Chat = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [postsNextPage, setPostsNextPage] = useState(2)
    const [postsCount, setPostsCount] = useState(0)
    const messageRef = useRef(null)
    const { state: { nickname: profileNickname } } = useContext(UserContext)
    const { state: { darkMode } } = useContext(ThemeContext)
    const {
        state: { modalSettings: { modalType, headerText, contentText } },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const fetchPosts = useCallback(async () => {
        try {
            setIsLoading(true)

            const allPosts = await getAllPosts()
            setPostsCount(allPosts.length)

            const postsFirstPage = await getPostsFromDefinitePage(1)
            setPosts(postsFirstPage)
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

            const userData = await sendPost(nickname, message)
            const allPosts = await getAllPosts()

            if (posts.length === allPosts.length - 1) setPosts((posts) => [...posts, userData])

            setPostsCount(allPosts.length)
            setMessage('')
            setIsLoading(false)
        } catch {
            throw new Error('Failed to add post')
        } finally {
            setIsLoading(false)
        }
    }

    const deletePost = async id => {
        try {
            setIsLoading(true)

            const nextPagePosts = await getPostsFromDefinitePage(postsNextPage)

            await deleteDefinitePost(id)

            const allPosts = await getAllPosts()
            setPostsCount(allPosts.length)

            if (posts.length - 1 === allPosts.length) return setPosts(posts.filter((post) => post.id !== id))

            setPosts(posts.concat(nextPagePosts[0]).filter((post) => post.id !== id))
            setIsLoading(false)
        } catch {
            throw new Error('Failed to delete post')
        } finally {
            setIsLoading(false)
        }
    }

    const handleReturnToEdit = () => {
        closeModal(setIsModalOpen)
        if (!message.trim()) messageRef.current.focus()
    }

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await addPost(profileNickname, message)
        } catch {
            throw new Error('Failed to submit post')
        }
    }

    const handleShowMorePosts = async () => {
        try {
            setIsLoading(true)

            const nextPagePostsData = await getPostsFromDefinitePage(postsNextPage)

            setPosts(posts.concat(nextPagePostsData))
            setPostsNextPage(postsNextPage + 1)
            setIsLoading(false)
        } catch {
            throw new Error('Failed to get posts')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="manage-posts-container">
            <div className="add-post-container">
                <h2 className="highlight-blue">Create post</h2>
                <hr />
                {profileNickname
                    ? <form onSubmit={handleSubmit}>
                        <TextArea
                            className="textarea-content"
                            placeholder={`What's on your mind, ${profileNickname}?`}
                            ref={messageRef}
                            value={message}
                            handleChange={e => setMessage(e.target.value)}
                        />
                        <Button isLoading={isLoading} type='submit'>Send post</Button>
                    </form>
                    : <p style={{ textAlign: 'center' }}>You must be logged in to send messages</p>
                }
            </div>
            <div style={{ height: 'max-content' }}>
                {isLoading && <Loader />}
                <div className={classNames("posts-container", isLoading && "blocked")}>
                    <h2 className="highlight-purple">Published posts {postsCount ? `(${postsCount})` : null}</h2>
                    <hr />
                    {!isLoading && !posts.length
                        ? <p style={{ textAlign: 'center' }}>No posts in here. You'll be the first!</p>
                        : posts.map(({ id, nickname, message, time, date }) => {
                            return (
                                <div key={id} className="post-card">
                                    <i className="fa-solid fa-circle-user"></i>
                                    <h3 className="post-user-name">{nickname}</h3>
                                    <p className="post-message">
                                        <span className="post-time">{time}</span> {message}
                                    </p>
                                    <p className="post-date">
                                        Posted: {date}
                                        {profileNickname === nickname &&
                                            <Button
                                                className={classNames('delete-button', profileNickname === nickname && 'visible')}
                                                handleClick={() => deletePost(id)}>
                                                Delete
                                            </Button>
                                        }
                                    </p>
                                </div>
                            )
                        })
                    }
                    {posts.length !== postsCount && <div className="flex-all-centered">
                        <Button className='show-more-button' handleClick={handleShowMorePosts}>Show more</Button>
                    </div>}
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
                <div className={"modal-actions"}>
                    <Button handleClick={handleReturnToEdit}>Return to edit</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Chat
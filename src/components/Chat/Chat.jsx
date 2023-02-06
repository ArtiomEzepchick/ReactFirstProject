import React, { useState, useEffect, useRef, useCallback, useContext, useReducer } from "react"
import classNames from 'classnames'
import TextArea from "../TextArea/TextArea"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import { ModalContext } from "../../contexts/modalContext/ModalContext"
import { UserContext } from "../../contexts/userContext/userContext"
import { ThemeContext } from "../../contexts/themeContext/ThemeContext"
import { CHAT_ACTION_TYPES, chatReducer, initialValues } from "../../reducers/chatReducer/chatReducer"
import { MODAL_TYPES } from "../Modal/modalTypes"
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer"
import { sendPost, getAllPosts, getPostsFromDefinitePage, deleteDefinitePost } from "../../helpers/requests/requests"
import './styles.css'

const {
    SET_MODAL_OPEN,
    SET_LOADING,
    SET_EDIT_MODE,
    SET_POSTS,
    SET_POSTS_NEXT_PAGE,
    SET_POSTS_COUNT,
    SET_MESSAGE,
    SET_SAVED_MESSAGE,
    SET_CHANGED_MESSAGE,
    SET_CURRENT_POST_ID
} = CHAT_ACTION_TYPES

const Chat = () => {
    const [state, dispatch] = useReducer(chatReducer, initialValues)
    const {
        isModalOpen,
        isLoading,
        isEditMode,
        posts,
        postsNextPage,
        postsCount,
        message,
        currentPostId,
        savedMessage,
    } = state
    const messageRef = useRef(null)
    const { state: { nickname: profileNickname } } = useContext(UserContext)
    const { state: { darkMode } } = useContext(ThemeContext)
    const {
        state: { modalSettings: { modalType, headerText, contentText } },
        dispatch: dispatchModal
    } = useContext(ModalContext)

    const fetchPosts = useCallback(async () => {
        try {
            dispatch({ type: SET_LOADING, payload: true })

            const allPosts = await getAllPosts()
            console.log(allPosts.length)
            dispatch({ type: SET_POSTS_COUNT, payload: allPosts.length })

            const postsFirstPage = await getPostsFromDefinitePage(1)
            dispatch({ type: SET_POSTS, payload: postsFirstPage })
            dispatch({ type: SET_LOADING, payload: false })
        } catch {
            throw new Error('Failed to get posts')
        } finally {
            dispatch({ type: SET_LOADING, payload: false })
        }
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    const addPost = async (nickname, message) => {
        if (!message.trim()) {
            dispatch({ type: SET_MODAL_OPEN, payload: true })

            return dispatchModal({
                type: REDUCER_TYPES.CHANGE_MODAL, payload: {
                    modalType: MODAL_TYPES.ALERT,
                    headerText: 'Message field is empty',
                    contentText: 'You need to type something'
                }
            })
        }

        try {
            dispatch({ type: SET_LOADING, payload: true })

            const userData = await sendPost(nickname, message)
            const allPosts = await getAllPosts()

            if (posts.length === allPosts.length - 1) dispatch({ type: SET_POSTS, payload: [...posts, userData] })

            dispatch({ type: SET_POSTS_COUNT, payload: allPosts.length })
            dispatch({ type: SET_MESSAGE, payload: '' })
            dispatch({ type: SET_LOADING, payload: false })
        } catch {
            throw new Error('Failed to add post')
        } finally {
            dispatch({ type: SET_LOADING, payload: false })
        }
    }

    const deletePost = async id => {
        try {
            dispatch({ type: SET_LOADING, payload: true })

            const nextPagePosts = await getPostsFromDefinitePage(postsNextPage)

            await deleteDefinitePost(id)

            const allPosts = await getAllPosts()
            dispatch({ type: SET_POSTS_COUNT, payload: allPosts.length })

            if (posts.length - 1 === allPosts.length) return dispatch({ type: SET_POSTS, payload: posts.filter((post) => post.id !== id) })

            dispatch({ type: SET_POSTS, payload: posts.concat(nextPagePosts[0]).filter((post) => post.id !== id) })
            dispatch({ type: SET_LOADING, payload: false })
        } catch {
            throw new Error('Failed to delete post')
        } finally {
            dispatch({ type: SET_LOADING, payload: false })
        }
    }

    const handleReturnToEdit = () => {
        const overlay = document.querySelector('.overlay')

        if (overlay) {
            if (overlay.classList.contains('show')) {
                overlay.classList.add('hidden')

                setTimeout(() => {
                    overlay.classList.remove('show')
                    dispatch({ type: SET_MODAL_OPEN, payload: false })
                }, 500)
            }
        }

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
            dispatch({ type: SET_LOADING, payload: true })

            const nextPagePostsData = await getPostsFromDefinitePage(postsNextPage)

            dispatch({ type: SET_POSTS, payload: posts.concat(nextPagePostsData) })
            dispatch({ type: SET_POSTS_NEXT_PAGE, payload: postsNextPage + 1 })
            dispatch({ type: SET_LOADING, payload: false })
        } catch {
            throw new Error('Failed to get posts')
        } finally {
            dispatch({ type: SET_LOADING, payload: false })
        }
    }

    const handleEditPost = (message, id) => {
        dispatch({ type: SET_EDIT_MODE, payload: true })
        dispatch({ type: SET_SAVED_MESSAGE, payload: message })
        dispatch({ type: SET_CURRENT_POST_ID, payload: id })
    }

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }

    return (
        <div className="manage-posts-container">
            <section className="add-post-container">
                <h2 className="highlight-blue">Create post</h2>
                <hr />
                {profileNickname
                    ? <form onSubmit={handleSubmit}>
                        <TextArea
                            className="textarea-content"
                            placeholder={`What's on your mind, ${profileNickname}?`}
                            ref={messageRef}
                            value={message}
                            handleChange={e => dispatch({ type: SET_MESSAGE, payload: e.target.value })}
                        />
                        <Button isLoading={isLoading} type='submit'>Send post</Button>
                    </form>
                    : <p style={{ textAlign: 'center' }}>You must be logged in to send messages</p>
                }
            </section>
            <section style={{ height: 'max-content' }}>
                {isLoading && <Loader />}
                <div className={classNames("posts-container", isLoading && "blocked")}>
                    <h2 className="highlight-purple">Published posts {postsCount ? `(${postsCount})` : null}</h2>
                    <hr />
                    {!isLoading && !posts.length
                        ? <p style={{ textAlign: 'center' }}>No posts in here. You'll be the first!</p>
                        : posts.map(({ id, nickname, message, time, date }) => {
                            return (
                                <div key={id} className={classNames("post-card", profileNickname === nickname && 'current-user')}>
                                    <i className={classNames("fa-solid fa-circle-user", profileNickname === nickname && 'current-user')}></i>
                                    <h3 className="post-user-name">{nickname}</h3>
                                    <p className="post-message">
                                        {isEditMode && profileNickname === nickname && id === currentPostId
                                            ? <TextArea
                                                defaultValue={message}
                                                className='post-edit-area'
                                                autoFocus
                                                handleChange={e => dispatch({ type: SET_CHANGED_MESSAGE, payload: e.target.value })}
                                            />
                                            : <React.Fragment>
                                                <span className="post-time">{time}</span>{message}
                                            </React.Fragment>
                                        }
                                    </p>
                                    <div className="post-date">
                                        Posted: {date}
                                        {profileNickname === nickname &&
                                            <div className={classNames('post-actions', profileNickname === nickname && 'visible')}>
                                                <Button
                                                    className='post-edit-button'
                                                    icon={isEditMode && id === currentPostId
                                                        ? <i className="fa-regular fa-paper-plane"></i>
                                                        : <i className="fa-regular fa-pen-to-square"></i>
                                                    }
                                                    handleClick={() => handleEditPost(message, id)}
                                                >
                                                    {isEditMode && id === currentPostId ? 'Submit' : 'Edit'}
                                                </Button>
                                                <Button
                                                    className='post-delete-button'
                                                    icon={<i className="fa-regular fa-circle-xmark"></i>}
                                                    handleClick={() => deletePost(id)}>
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    {posts.length !== postsCount && <div className="flex-all-centered">
                        <Button className='show-more-button' handleClick={handleShowMorePosts}>
                            Show more ({postsCount - posts.length})
                        </Button>
                    </div>}
                </div>
            </section>
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
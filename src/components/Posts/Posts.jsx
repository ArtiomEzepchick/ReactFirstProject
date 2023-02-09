import React from "react"

import Accordion from "../Accordion/Accordion"
import Chat from "../Chat/Chat"

import { accordionPostsPageData } from "../../helpers/accordionData/accordionData"
import "./styles.css"

const Posts = () => {
    return (
        <div className="posts-page-wrapper">
            <h1 style={{ marginTop: "1rem" }}>
                <span className="highlight-purple">Posts</span> area
            </h1>
            <hr />
            <div className="accordion-container">
                {accordionPostsPageData.map(({ title, content }) => (
                    <Accordion
                        key={title}
                        title={title}
                        content={content}
                    />
                ))}
            </div>
            <hr />
            <Chat />
        </div>
    )
}

export default Posts
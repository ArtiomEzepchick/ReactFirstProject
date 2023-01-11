import React from "react"
import Accordion from '../Accordion/Accordion'
import { accordionMorePageData } from "../../helpers/accordionData/accordionData"
import Chat from "../Chat/Chat"
import './styles.css'

const Posts = () => {
    return (
        <div className='posts-page-wrapper'>
            <h1 style={{ marginTop: '1rem' }}>
                <span className='highlight-purple'>Posts</span> area
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
            <Chat />
        </div>
    )
}

export default Posts
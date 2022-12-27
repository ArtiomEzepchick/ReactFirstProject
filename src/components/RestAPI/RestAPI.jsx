import React from "react"
import Accordion from '../Accordion/Accordion'
import { accordionMorePageData } from "../../helpers/accordionData/accordionData"
import Posts from "../Posts/Posts"
import './styles.css'

const RestAPI = () => {
    return (
        <div className='more-page-wrapper'>
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
            <Posts />
        </div>
    )
}

export default RestAPI
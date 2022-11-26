import React from "react"
import { Clock } from "../Clock/Clock"

const Home = () => {
    return (
        <React.Fragment>
            <h1>Welcome to Home Page!</h1>
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi animi error atque facere minima sunt sed officiis accusamus, aliquid, odio velit perferendis cum iure, inventore voluptates labore! Culpa, reiciendis ipsa?
                </p>
                <Clock />
            </div>
        </React.Fragment>
    )
}

export default Home
import React, { useContext } from "react"
import classNames from "classnames"
import { OrientationContext } from "../../contexts/orientationContext/OrientationContext"
import './styles.css'

const Loader = () => {
    const { state: { isHorizontal } } = useContext(OrientationContext)

    return (
        <div className={classNames("loader", !isHorizontal && 'moved')}></div>
    )
}

export default Loader
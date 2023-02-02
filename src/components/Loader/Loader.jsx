import React, { useContext } from "react"
import PropTypes from 'prop-types'
import classNames from "classnames"
import { OrientationContext } from "../../contexts/orientationContext/OrientationContext"
import './styles.css'

const Loader = ({ isModalOpen }) => {
    const { state: { isHorizontal } } = useContext(OrientationContext)

    return (
        <div className={classNames("loader", !isHorizontal && !isModalOpen && 'moved')}></div>
    )
}

Loader.propTypes = {
    isModalOpen: PropTypes.bool
}

export default Loader
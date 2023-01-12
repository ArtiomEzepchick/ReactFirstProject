import React from "react"
import classNames from "classnames"
import PropTypes from 'prop-types'
import './styles.css'

const Overlay = ({ isModalOpen, darkMode, children }) => {
    return(
        <div className={classNames('overlay', isModalOpen && 'show', darkMode && 'dark')}>
            {children}
        </div>
    )
}

Overlay.propTypes = {
    isModalOpen: PropTypes.bool,
    darkMode: PropTypes.bool
}

export default Overlay
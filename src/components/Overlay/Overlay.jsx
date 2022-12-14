import React from "react"
import classNames from "classnames"
import PropTypes from 'prop-types'
import './styles.css'

const Overlay = ({ isModalOpen, children }) => {
    return(
        <div className={classNames('overlay', isModalOpen && 'show')}>
            {children}
        </div>
    )
}

Overlay.propTypes = {
    isModalOpen: PropTypes.bool
}

export default Overlay
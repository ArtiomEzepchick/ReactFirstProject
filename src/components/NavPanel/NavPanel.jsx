import React from "react"
import classNames from "classnames"
import { Link } from "../Link/Link"
import links from "../../helpers/links/links"
import PropTypes from 'prop-types'

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    return (
        <header className={classNames('layout-header', !isHorizontal && 'vertical', darkMode && 'dark')}>
            <nav className={classNames('nav-panel', 'flex-all-centered', !isHorizontal && 'vertical', darkMode && 'dark')}>
                <div className={classNames('links-container', !isHorizontal && 'vertical')}>
                    {links.map(({ label, href }, index) => {
                        return (
                            <Link
                                key={label + index}
                                href={href}
                                label={label}
                            />
                        )
                    })}
                </div>

                <div className={classNames('toggle-buttons', !isHorizontal && 'vertical')}>
                    <button className='toggle-btn' onClick={handleChangeOrientation}>
                        Toggle Nav Panel Orientation
                    </button>
                    <button className='toggle-btn' onClick={handleChangeTheme}>
                        Change Theme
                    </button>
                </div>
            </nav>
        </header>
    )
}

NavPanel.propTypes = {
    darkMode: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    handleChangeTheme: PropTypes.func,
    handleChangeOrientation: PropTypes.func
}

export default NavPanel
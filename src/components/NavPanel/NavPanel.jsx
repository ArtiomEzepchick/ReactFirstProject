import React from "react"
import classNames from "classnames"
import { Link } from "../Link/Link"
import links from "../../pages/helpers/links/links"
import "./styles.css"

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    return (
        <header className={classNames('layout-header', !isHorizontal && 'vertical', darkMode && 'dark')}>
            <nav className={classNames('nav-panel', !isHorizontal && 'vertical', darkMode && 'dark')}>
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

export default NavPanel
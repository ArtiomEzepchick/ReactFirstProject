import React from "react"
import classNames from "classnames"
import { Link } from "../Link/Link"
import Button from "../Button/Button"
import links from "../../helpers/links/links"
import PropTypes from 'prop-types'
import './styles.css'

const NavPanel = ({ darkMode, isHorizontal, handleChangeTheme, handleChangeOrientation }) => {
    return (
        <header className={classNames('layout-header', !isHorizontal && 'vertical', darkMode && 'dark')}>
            <nav className={classNames('nav-panel', !isHorizontal && 'vertical', darkMode && 'dark')}>
                <div className={classNames('links-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
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

                <div className={classNames('toggle-buttons-container', 'flex-all-centered', !isHorizontal && 'vertical')}>
                    <Button
                        innerText='Toggle Nav Panel Orientation'
                        className='toggle-button'
                        handleClick={handleChangeOrientation}
                    />
                    <Button
                        innerText='Change Theme'
                        className='toggle-button'
                        handleClick={handleChangeTheme}
                    />
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
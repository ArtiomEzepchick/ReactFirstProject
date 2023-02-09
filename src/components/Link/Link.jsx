import React from "react"
import PropTypes from "prop-types"

import { Button } from "antd"
import { NavLink } from "react-router-dom"

const Link = ({ href, label }) => {
    return (
        <React.Fragment>
            <Button className="action-button" size="large">
                <NavLink
                    to={href}
                    className={({ isActive }) => isActive ? "active-page" : ""}
                >
                    {label}
                </NavLink>
            </Button>
        </React.Fragment>
    )
}

Link.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default Link
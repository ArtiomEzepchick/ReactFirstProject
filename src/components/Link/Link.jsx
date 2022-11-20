import React from "react"
import { Button } from "antd";
import { NavLink } from "react-router-dom";

export const Link = ({ href, label }) => {
    return (
        <React.Fragment>
            <Button className='action' size='large'>
                <NavLink
                    to={href}
                    className={({ isActive }) => isActive ? 'active-page' : ''}
                >
                    {label}
                </NavLink>
            </Button>
        </React.Fragment>
    )
}
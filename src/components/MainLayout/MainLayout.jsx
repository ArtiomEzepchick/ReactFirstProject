import React, { useContext } from "react";
import classNames from "classnames";
import { Layout } from 'antd'
import { ThemeContext } from "../../contexts/ThemeContext";
import { OrientationContext } from '../../contexts/OrientationContext';
import { REDUCER_TYPES } from "../../reducers/reducers";
import NavPanel from "../NavPanel/NavPanel";

const { Content, Footer } = Layout

const MainLayout = ({ children }) => {
    const {
        state: { darkMode },
        dispatch
    } = useContext(ThemeContext)

    const {
        state: { isHorizontal },
        dispatch: dispatcher
    } = useContext(OrientationContext)

    return (
        <React.Fragment>
            <NavPanel
                isHorizontal={isHorizontal}
                darkMode={darkMode}
                handleChangeOrientation={() => dispatcher({ type: REDUCER_TYPES.TOGGLE_ORIENTATION })}
                handleChangeTheme={() => dispatch({ type: REDUCER_TYPES.TOGGLE_THEME })}
            />

            <Content className={classNames("site-layout", !isHorizontal && 'vertical', darkMode && 'dark' )} >
                <div
                    style={{ padding: '1.2rem 1.2rem 2rem', minHeight: 550 }}>
                    {children}
                </div>
            </Content>

            <Footer
                className={classNames(!isHorizontal && 'vertical', darkMode && 'dark')}
                style={{ textAlign: 'center' }}
            >Made by Artsiom Ezepchik</Footer>
        </React.Fragment>
    )
}

export default MainLayout
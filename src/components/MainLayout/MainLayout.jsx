import React, { useContext } from "react";
import classNames from "classnames";
import { Layout } from 'antd'
import { ThemeContext } from "../../contexts/themeContext/ThemeContext";
import { OrientationContext } from '../../contexts/orientationContext/OrientationContext';
import { REDUCER_TYPES } from "../../reducers/contextReducer/contextReducer";
import NavPanel from "../NavPanel/NavPanel";
import './styles.css'

const { Content, Footer } = Layout

const MainLayout = ({ children }) => {
    const {
        state: { darkMode },
        dispatch
    } = useContext(ThemeContext)

    const {
        state: { isHorizontal },
    } = useContext(OrientationContext)

    return (
        <React.Fragment>
            <NavPanel
                isHorizontal={isHorizontal}
                darkMode={darkMode}
                handleChangeOrientation={() => dispatch({ type: REDUCER_TYPES.TOGGLE_ORIENTATION })}
                handleChangeTheme={() => dispatch({ type: REDUCER_TYPES.TOGGLE_THEME })}
            />

            <Content className={classNames("site-layout", !isHorizontal && 'vertical', darkMode && 'dark')} >
                {children}
            </Content>

            <Footer
                className={classNames(!isHorizontal && 'vertical', darkMode && 'dark')}
                style={{ textAlign: 'center' }}
            >
                <p>&#169; 2023 Made by Artsiom Ezepchik</p>
                <div className="copyright-links">
                    <p>Contact me:</p>
                    <a href="linkedin.com/in/artiom-ezepchick">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/art_ezepchik/">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://t.me/ArtiomEzepchik">
                        <i className="fab fa-telegram"></i>
                    </a>
                </div>
            </Footer>
        </React.Fragment>
    )
}

export default MainLayout
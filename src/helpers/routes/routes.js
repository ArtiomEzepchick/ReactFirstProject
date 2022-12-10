import paths from "../paths/paths";
import HomePage from "../../pages/Home/HomePage";
import ReduxPage from "../../pages/Redux/ReduxPage";
import AboutPage from "../../pages/About/AboutPage";


const routes = [
    {
        path: paths.home,
        component: <HomePage />
    },
    {
        path: paths.redux,
        component: <ReduxPage />
    },
    {
        path: paths.about,
        component: <AboutPage />
    }
]

export default routes
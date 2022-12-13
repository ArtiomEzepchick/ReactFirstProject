import paths from "../paths/paths";
import HomePage from "../../pages/Home/HomePage";
import ReduxPage from "../../pages/Redux/ReduxPage";
import MorePage from "../../pages/Rest/RestPage";

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
        path: paths.more,
        component: <MorePage />
    }
]

export default routes
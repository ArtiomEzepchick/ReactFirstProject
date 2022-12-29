import paths from "../paths/paths";
import HomePage from "../../pages/Home/HomePage";
import ReduxPage from "../../pages/Redux/ReduxPage";
import PostsPage from "../../pages/Posts/PostsPage";

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
        path: paths.posts,
        component: <PostsPage />
    }
]

export default routes
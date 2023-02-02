import HomePage from "../../pages/Home/HomePage";
import ReduxPage from "../../pages/Redux/ReduxPage";
import PostsPage from "../../pages/Posts/PostsPage";
import UserProfilePage from "../../pages/UserProfile/UserProfilePage";
import { paths } from "../paths/paths";

export const routes = [
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
    },
    {
        path: paths.profile,
        component: <UserProfilePage />
    }
]
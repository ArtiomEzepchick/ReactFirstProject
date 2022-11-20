import paths from "../paths/paths";
import HomePage from "../../Home/HomePage";
import ProductsPage from "../../Products/ProductsPage";
import UsersPage from "../../Users/UsersPage";

const routes = [
    {
        path: paths.home,
        component: <HomePage />
    },
    {
        path: paths.products,
        component: <ProductsPage />
    },
    {
        path: paths.users,
        component: <UsersPage />
    }
]

export default routes
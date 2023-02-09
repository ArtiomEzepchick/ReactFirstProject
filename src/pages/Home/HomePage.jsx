import React, { lazy, Suspense } from "react"
import MainLayout from "../../components/MainLayout/MainLayout"
import Loader from "../../components/Loader/Loader"

const Home = lazy(() =>
    import("../../components/Home/Home").then((component) => {
        return new Promise((resolve) => setTimeout(() => resolve(component), 1000))
    })
)

const HomePage = () => {
    return (
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <Home />
            </Suspense>
        </MainLayout>
    )
}

export default HomePage
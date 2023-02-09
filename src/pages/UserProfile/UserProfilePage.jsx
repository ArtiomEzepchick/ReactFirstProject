import React, { lazy, Suspense } from "react"
import MainLayout from "../../components/MainLayout/MainLayout"
import Loader from "../../components/Loader/Loader"

const UserProfile = lazy(() =>
    import("../../components/UserProfile/UserProfile").then((component) => {
        return new Promise((resolve) => setTimeout(() => resolve(component), 1000))
    })
)

const UserProfilePage = () => {
    return (
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <UserProfile />
            </Suspense>
        </MainLayout>
    )
}

export default UserProfilePage
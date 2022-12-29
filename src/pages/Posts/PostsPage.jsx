import React, { lazy, Suspense } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Loader from '../../components/Loader/Loader'

const Posts = lazy(() =>
    import("../../components/Posts/Posts").then((component) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(component)
            }, 1000)
        })
    })
)

const PostsPage = () => {
    return(
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <Posts />
            </Suspense>
        </MainLayout>
    )
}

export default PostsPage
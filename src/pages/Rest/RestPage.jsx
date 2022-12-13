import React, { lazy, Suspense } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Loader from '../../components/Loader/Loader'

const More = lazy(() =>
    import("../../components/More/More").then((component) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(component)
            }, 1000)
        })
    })
)

const MorePage = () => {
    return(
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <More />
            </Suspense>
        </MainLayout>
    )
}

export default MorePage
import React, { lazy, Suspense } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Loader from '../../components/Loader/Loader'

const RestAPI = lazy(() =>
    import("../../components/RestAPI/RestAPI").then((component) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(component)
            }, 1000)
        })
    })
)

const RestPage = () => {
    return(
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <RestAPI />
            </Suspense>
        </MainLayout>
    )
}

export default RestPage
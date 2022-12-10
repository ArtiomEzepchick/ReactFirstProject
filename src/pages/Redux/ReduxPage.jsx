import React, { lazy, Suspense } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Loader from '../../components/Loader/Loader'

const ReduxForm = lazy(() =>
    import("../../components/ReduxForm/ReduxForm").then((component) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(component)
            }, 1000)
        })
    })
)

const ReduxPage = () => {
    return(
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <ReduxForm />
            </Suspense>
        </MainLayout>
    )
}

export default ReduxPage
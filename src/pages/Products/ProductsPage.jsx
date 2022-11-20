import React, { Suspense, lazy } from 'react'
import MainLayout from '../../components/MainLayout/MainLayout'
import Loader from '../../components/Loader/Loader'

const Products = lazy(() =>
    import("../../components/Products/Products").then((component) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(component)
            }, 1000)
        })
    })
)

const ProductsPage = () => {
    return (
        <MainLayout>
            <Suspense fallback={<Loader />}>
                <Products />
            </Suspense>
        </MainLayout>
    )
}

export default ProductsPage
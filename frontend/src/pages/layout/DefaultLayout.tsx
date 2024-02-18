import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginAndRegister } from '../LoginAndRegister'
import { WelcomePage } from '../WelcomePage'
import { useGetUser, useUserLoading } from '../../hooks'
import { LoadingComponent } from '../../components/LoadingComponent'
import { UserPage } from '../UserPage'
import { Market } from '../../components/home/Market'
import { Cart } from '../../components/home/Cart'
import { Settings } from '../../components/home/Settings'
import { PageNotFound } from '../PageNotFound'
import { PropertyDetails } from '../../components/home/PropertyDetails'
import { NavBar } from '../../components/NavBar'

export const DefaultLayout = () => {
    const loading = useUserLoading()
    const user = useGetUser()

    if (loading) {
        return <LoadingComponent />
    }

    return (
        <Routes>
            <Route element={<NavBar />}>
                <Route path='/' element={user ? <Navigate to='/home' /> : <WelcomePage />} />
                <Route path='login' element={<LoginAndRegister type='Login' />} />
                <Route path='register' element={<LoginAndRegister type='Register' />} />
            </Route>
            <Route path='home' element={<UserPage />} >
                <Route index element={<Navigate to={'/home/market'} />} />
                <Route path='market' element={<Market />} />
                <Route path='market/:propertyId' element={<PropertyDetails />} />
                <Route path='cart' element={<Cart />} />
                <Route path='settings' element={<Settings />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

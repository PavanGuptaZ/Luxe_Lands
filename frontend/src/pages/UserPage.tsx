import { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/UserPage.module.scss'
import { UserContext } from '../hooks/ContextProvider';
import { ReducerTypes } from '../hooks';
import { LoginAndRegister } from './LoginAndRegister';
import { BasicBTN } from '../components/buttons/BasicBTN';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import logOutFn from '../apis/auth/logout'

export const UserPage = () => {
    const { DispatchUser, user } = useContext(UserContext)
    const [display, setDisplay] = useState(false)
    const navigator = useNavigate()

    if (!user) return <LoginAndRegister type='Login' />

    const handleLogout = () => {
        DispatchUser({ type: ReducerTypes.removeUser, payload: null })
        navigator('/')
        logOutFn()
    }
    const toggleDisplay = () => setDisplay(!display)
    return (
        <div className={styles.UserPageBox}>
            <aside className={styles.asideControlar} style={{ left: display ? "0" : "-100%" }}>
                <div className={styles.CoverBox} onClick={() => setDisplay(false)} style={{ display: !display ? "none" : "block" }}></div>
                <div className={styles.content}>
                    <div><img src={logo} alt={'logo'} width={'75px'} /></div>
                    <NavLink to={'/home/cart'} className={({ isActive }) => isActive ? styles.active : ""} onClick={() => setDisplay(false)}>cart</NavLink>
                    <NavLink to={'/home/market'} className={({ isActive }) => isActive ? styles.active : ""} onClick={() => setDisplay(false)}>market</NavLink>
                    <NavLink to={'/home/settings'} className={({ isActive }) => isActive ? styles.active : ""} onClick={() => setDisplay(false)}>settings</NavLink>
                    <div onClick={handleLogout}>logout</div>
                </div>
            </aside>
            <main className={styles.mainContent}>
                <header className={styles.headerBox}>
                    {!display ? <GiHamburgerMenu className={styles.operator} onClick={toggleDisplay} />
                        : <IoCloseSharp className={styles.operator} onClick={toggleDisplay} />}
                    <div className={styles.profileBtn}><BasicBTN text='profile' /></div>
                </header>
                <header className={styles.headerBox}>
                    <p className={styles.heading}>Choose Your New Site</p>
                </header>
                <Outlet />
            </main>
        </div>
    )
}

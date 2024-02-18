import styles from '../styles/NavBar.module.scss';
import Logo from '../assets/logo.png';
import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export const NavBar = () => {

    const [display, setdisplay] = useState('-100%')

    const displayToggle = () => {
        setdisplay(display === '-100%' ? '0' : '-100%')
    }

    const classNameCheck = (isActive: boolean) => {
        return styles.NavLink + " " + (isActive ? styles.active : "")
    }
    return (
        <>
            <nav className={styles.NavBarBox} >
                <NavLink className={styles.LogoBox} to='/'>
                    <div className={styles.imageBox}>
                        <img src={Logo} alt="" height={"100%"} />
                    </div>
                    <div className={styles.title}>Luxe Lands</div>
                </NavLink>
                <div className={styles.LinksBox}>
                    <div className={styles.Links} style={{ right: display }}>
                        <div className={styles.closeArrow} onClick={displayToggle}><FaArrowRight /></div>
                        <NavLink to='/' className={({ isActive }) => classNameCheck(isActive)}>Welcome Page</NavLink>
                        <NavLink to='/login' className={({ isActive }) => classNameCheck(isActive)}>Login</NavLink>
                        <NavLink to='/register' className={({ isActive }) => classNameCheck(isActive)}>register</NavLink>
                    </div>
                    <div className={styles.openeArrow} onClick={displayToggle}><GiHamburgerMenu /> </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
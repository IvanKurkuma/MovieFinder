import React, {useState} from "react";
import {Link} from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import styles from './Header.module.scss';
import Logo from '../img/MovieFinderSVG'
import {useTheme} from '../contexts/ThemeContext'
import SearchInput from "./SearchInput";
import { useTranslate } from "../hooks/useTranslate";


function Header(){
    const [navState, toggleNavState]=useState('home');
    const {theme, toggleTheme}=useTheme();
    const {t}=useTranslate(); 

    return(
        <header>
            <div className={styles.first_div}>
                <Logo/>
            </div>
            <nav className={styles.navigator}>
                <Link className={navState === 'home' ? 
                      `${styles.navigator_one} ${styles.active_nav}` : 
                      styles.navigator_one}
                      onClick={()=>toggleNavState('home')}
                      to="/">
                        <IoMdHome aria-hidden="true" size={navState==='home'? 25:20}/>
                       {t('headers.buttons.main')}
                </Link>
                <Link className={navState === 'favorite' ? 
                      `${styles.navigator_one} ${styles.active_nav}` : 
                      styles.navigator_one}
                      onClick={()=>toggleNavState('favorite')}
                      to="/favorites">
                        <MdFavorite aria-hidden="true" size={navState==='favorite'? 25:20}/>
                         {t('headers.buttons.favorites')}
                </Link>
                <Link className={navState === 'history' ? 
                      `${styles.navigator_one} ${styles.active_nav}` : 
                      styles.navigator_one} 
                      onClick={()=>toggleNavState('history')}
                      to="/history">
                        <MdHistory aria-hidden="true" size={navState==='history'? 25:20}/>
                         {t('headers.buttons.history')}
                </Link>
            </nav>
            <div className={styles.right_div}>
                <SearchInput navState={navState}/>
                <button className={styles.theme_button} type="button" onClick={toggleTheme}>{theme==='dark'?<IoMoon size={25}/>:<MdSunny size={25}/>}</button>
            </div>
          
        </header>
    )

}

export default Header;


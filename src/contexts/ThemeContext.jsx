import {createContext, useState, useContext, useEffect} from 'react';

const ThemeContext=createContext();

export const ThemeProvider=({children})=>{
    const [theme, setTheme]=useState('dark');
    const [lang, setLang]=useState('en-US')

    useEffect(()=>{
        try {
            const savedTheme=localStorage.getItem('theme')
            const savedLang=localStorage.getItem('language')
            if(savedTheme && savedTheme!==theme){
                toggleTheme()
            }   

            if(savedLang && savedLang !== lang){
                setLang(savedLang)
            }

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(()=>{
        try {
            localStorage.setItem('theme', theme)
        } catch (error) {
            console.error(error)
        }
    }, [theme])

    useEffect(()=>{
        try {
            localStorage.setItem('language', lang)
        } catch (error) {
            console.error(error)
        }
    }, [lang])

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme=()=>{
        setTheme(prev=>(prev==='light'?'dark':'light'))
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme, lang, setLang}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme=()=>useContext(ThemeContext);
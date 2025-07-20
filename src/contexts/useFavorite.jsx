import React, {createContext, useContext, useEffect, useState} from "react";
import { useTheme } from "./ThemeContext";
import axios from 'axios';

const FavoriteContext=createContext();

export const FavoriteProvider = ({children}) => {
    const [favorites, setFavorites]=useState(()=>{
        const saved=localStorage.getItem('favorites')
        return saved?JSON.parse(saved):[]
    })
    const {lang}=useTheme()
    

    useEffect(()=>{
        localStorage.setItem('favorites', JSON.stringify(favorites))
    },[favorites])

    const isFavorites=(film)=>favorites.some(f=>f.id===film.id);

    const toggleFavorites=(film)=>{
        setFavorites(prev=>isFavorites(film)?prev.filter(f=>f.id!==film.id):[...prev, film]
        )
    }


    useEffect(()=>{
        const controller=new AbortController;
        let isMounted=true;

        const toggleLangInFavorites = async ()=>{
            const updatesFilms=[]

            for(const film of favorites){
                if(film.language !== lang){
                    try {
                        const response =await axios.get(`https://api.themoviedb.org/3/movie/${film.id}`,{
                            params:{
                                api_key: import.meta.env.VITE_API_KEY,
                                language: lang
                            },
                            signal:controller.signal
                        })
                        updatesFilms.push({ ...response.data, language: lang }) 
                    } catch (error) {
                        if(!axios.isCancel(error)) console.error("Ошибка: "+error);
                        updatesFilms.push(film) 
                    } 
                }
                else {
                    updatesFilms.push(film)
                }
            }
            if(isMounted) setFavorites(updatesFilms);
        }

        toggleLangInFavorites();

        return ()=> {
            isMounted=false
            controller.abort()
        }
    },[lang] )


    return (
        <FavoriteContext.Provider value={{favorites, toggleFavorites, isFavorites}}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavorites=()=>useContext(FavoriteContext);
import React from "react";
import {useFavorites} from '../contexts/useFavorite'
import FilmCard from "../components/FilmCard";
import { TfiFaceSad } from "react-icons/tfi";
import {useTranslate} from "../hooks/useTranslate"

function Favorites(){
    const {favorites}=useFavorites();
    const {t}=useTranslate()

    return (
        <main>
            <h1 style={{marginLeft:150}}>{t('favorites.title')}</h1>
            <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                {favorites.length?<FilmCard films={favorites}/>: <div style={{fontSize:'60px'}}>{t('favorites.empty')} <TfiFaceSad /></div>}
            </div>
        </main>
    );
}

export default Favorites
import React from "react";
import MovieRoulette from "../componentsRandom/MovieRoulette";
import {useFavorites} from '../contexts/useFavorite'
import {useTranslate} from "../hooks/useTranslate"

function History(){
    const {t} = useTranslate();
    const {favorites}= useFavorites()

    return <main>
        <h1 style={{marginLeft:150}}>{t('history.title')}</h1>
        <MovieRoulette movies={favorites}/>
    </main>
}

export default History
import React from "react";
import MovieRoulette from "../componentsRandom/MovieRoulette";
import {useFavorites} from '../contexts/useFavorite'

function History(){
    const {favorites}= useFavorites()
    return <main>
        <h1 style={{marginLeft:150}}>Movie Randomiser</h1>
        <MovieRoulette movies={favorites}/>
    </main>
}

export default History
import React from "react";
import {useFavorites} from '../contexts/useFavorite'
import FilmCard from "../components/FilmCard";

function Favorites(){
    const {favorites}=useFavorites();
    return (
        <main>
            <h1 style={{marginLeft:150}}>Favorites Movie</h1>
            <div style={{width:'100%',display:'flex', justifyContent:'center'}}>
                <FilmCard films={favorites}/>
            </div>
        </main>
    );
}

export default Favorites
import React, {useState} from "react";
import styles from './FilmCard.module.scss'
import {useFavorites} from '../contexts/useFavorite'
import TextRating from "./Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FilmCard({films}){
    const {isFavorites, toggleFavorites} = useFavorites();

    const [flippedCards, setFlippedCards]=useState(new Set())

    const toggleFlippedCards = (filmId)=>{
        setFlippedCards(prev=>{
            const newSet= new Set(prev);
            if(newSet.has(filmId)){
                newSet.delete(filmId)
            }else{
                newSet.add(filmId)
            }
            return newSet;
        })
    }
    
    function makerData(release_date){
        const labels={
            '01':'Jan',
            '02':'Feb',
            '03':'Mar',
            '04':'Apr',
            '05':'May',
            '06':'Jun',
            '07':'Jul',
            '08':'Aug',
            '09':'Sep',
            '10':'Oct',
            '11':'Nov',
            '12':'Dec'
        }
        const newDat=release_date.split('-')

        return `${newDat[2]} ${labels[newDat[1]]} ${newDat[0]}`
    }

   return (
    <div className={styles.filmList}>
      {films.map(film => (
        <div 
          key={film.id} 
          className={`${styles.filmCard} ${flippedCards.has(film.id) ? styles.flipped : ''}`}
          onClick={() => toggleFlippedCards(film.id)}
        >
          <div className={styles.cardInner}>
            {!flippedCards.has(film.id)? <div className={styles.cardFront}>
              <img 
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`} 
                alt={film.title} 
              />
              <h3>{film.title}</h3>
              <TextRating startValue={film.vote_average} vote_count={film.vote_count}/>
              <span className={styles.datSpan}>{makerData(film.release_date)}</span>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorites(film);
                }} 
                className={styles.favoriteButton}
              >
                {isFavorites(film) ? <FavoriteIcon sx={{ color: '#ff6d75' }}/> : <FavoriteBorderIcon sx={{ color: '#ffb3b8' }}/>}
              </div>
            </div>:  <div className={styles.cardBack}>
              <div>
                <h2>{film.title}</h2>
                <p>{film.overview || 'Movie dont have overview'}</p>
              </div>
              <div className={styles.backFooter}>
                <TextRating startValue={film.vote_average} vote_count={film.vote_count}/>
                <span className={styles.datSpan}>{makerData(film.release_date)}</span>
              </div>
            </div>}
           
          </div>
        </div>
      ))}
    </div>
  );
}
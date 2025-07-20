// import React, {useState, useEffect} from "react";
// import { getRandom } from "../hooks/useRandom";
// import { useFavorites } from "../contexts/useFavorite";
// import styles from './Randomiser.module.scss'

// export default function Randomiser (){
    
//     return (
//         <div className={styles.conteinerRandomiser}>
//             <div>
//                 Лист фильмов
//             </div>
//             <nav>
//                 кнопки все
//             </nav>
//         </div>
//     )
// }





import React, { useState, useEffect, useRef } from 'react';
import { getRandom } from '../hooks/useRandom';
import './MovieRoulette.css';

const MovieRoulette = ({ movies }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [duration, setDuration] = useState(5000)
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  

  const startSpinning = () => {
    if (isSpinning || movies.length === 0) return;

    setIsSpinning(true);
    setWinner(null);
    startTimeRef.current = Date.now();
    let currentIndex = 0;

    // Быстрое переключение в начале
    intervalRef.current = setInterval(() => {
      setHighlightedIndex(currentIndex);
      currentIndex = getRandom(movies.length);
    }, 100);

    // Плавное замедление
    setTimeout(() => {
      clearInterval(intervalRef.current);
      
      const slowSpinInterval = setInterval(() => {
        setHighlightedIndex(currentIndex);
        currentIndex = getRandom(movies.length);
      }, 300);

      // Остановка
      setTimeout(() => {
        clearInterval(slowSpinInterval);
        const randomWinner = getRandom(movies.length);
        setHighlightedIndex(randomWinner);
        setWinner(movies[randomWinner]);
        setIsSpinning(false);
      }, duration - 1000);
    }, 1000);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setHighlightedIndex(null);
    setWinner(null);
    setIsSpinning(false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="movie-roulette">
      <div className="controls">
        <button onClick={startSpinning} disabled={isSpinning || movies.length === 0}>
          {isSpinning ? 'Крутится...' : 'Крутить рулетку'}
        </button>
        <button onClick={reset} disabled={isSpinning}>
          Сбросить
        </button>
        <div className="duration-control">
          <label>Длительность (мс):</label>
          <input 
            type="number" 
            step='1000'
            value={duration} 
            onChange={(e) => {setDuration(e.target.value)} }
            disabled={isSpinning}
          />
        </div>
        {!isSpinning||<button className='button-reset' onClick={clearInterval()}>Отмена</button>}
      </div>

      <div className="movies-container">
        {movies.map((movie, index) => (
          <div 
            key={movie.id || index}
            className={`movie-card ${highlightedIndex === index ? 'highlighted' : ''} ${winner === movie ? 'winner' : ''}`}
          >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title}  />
            <h3>{movie.title}</h3>
            {winner === movie && <div className="winner-label">ПОБЕДИТЕЛЬ!</div>}
          </div>
        ))}
      </div>

      {winner && (
        <div className="winner-announcement">
          <h2>Выбран фильм: {winner.title}</h2>
        </div>
      )}
    </div>
  );
};

export default MovieRoulette;
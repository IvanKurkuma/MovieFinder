
import React, { useState, useEffect, useRef } from 'react';
import { getRandom } from '../hooks/useRandom';
import './MovieRoulette.css';
import {useTranslate} from "../hooks/useTranslate"

const MovieRoulette = ({ movies }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [duration, setDuration] = useState(5000)
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const {t} = useTranslate();

  

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
          {isSpinning ? t('history.controls.spins') : t('history.controls.spin')}
        </button>
        <button onClick={reset} disabled={isSpinning}>
          {t('history.controls.reset')}
        </button>
        <div className="duration-control">
          <label>{t('history.controls.duration')}</label>
          <input 
            type="number" 
            step='1000'
            value={duration} 
            onChange={(e) => {setDuration(e.target.value)} }
            disabled={isSpinning}
          />
        </div>
        {!isSpinning||<button className='button-reset' onClick={clearInterval()}>{t('history.controls.cancel')}</button>}
      </div>


      {movies.length===0?<h1>{t('history.empty')}</h1>:
      <div className="movies-container">
        {movies.map((movie, index) => (
          <div 
            key={movie.id || index}
            className={`movie-card ${highlightedIndex === index ? 'highlighted' : ''} ${winner === movie ? 'winner' : ''}`}
          >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title}  />
            <h3>{movie.title}</h3>
            {winner === movie && <div className="winner-label">{t('history.winner')}</div>}
          </div>
        ))}
      </div>}

      {winner && (
        <div className="winner-announcement">
          <h2>{t('history.final')} {winner.title}</h2>
        </div>
      )}
    </div>
  );
};

export default MovieRoulette;
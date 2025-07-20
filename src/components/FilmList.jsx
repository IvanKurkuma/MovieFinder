import React, { useEffect, useState, useRef } from "react";
import Loading from './Loading';
import styles from './FilmList.module.scss'
import FilmCard from './FilmCard'
import SceletonList from "./SkeletonList";
import { useTheme } from "../contexts/ThemeContext";

function FilmList({ sort }) { 
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [films, setFilms] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const {lang} = useTheme()
    
    useEffect(() => {
        setFilms([]);
        setPage(1); 
        setError(null);
        setIsLoading(true);
        setIsFirstLoad(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [sort, lang]);
    
    useEffect(() => {
        let isMounted = true; 
        const controller = new AbortController(); 
        
        const fetchFilms = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${sort}?api_key=${API_KEY}&language=${lang}&page=${page}`,
                    { signal: controller.signal }
                );
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                if (isMounted) {
                    setFilms(prev => page === 1 ? data.results : [...prev, ...data.results]);
                    setIsFirstLoad(false);
                }
            } catch (err) {
                if (err.name !== 'AbortError' && isMounted) {
                    setError(err.message);
                    console.error("Error fetching films:", err);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        
        fetchFilms();
        
        return () => {
            isMounted = false;
            controller.abort(); 
        };
    }, [page, sort, API_KEY, lang]); 
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isLoading && !isFirstLoad) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );
        
        const loader = loaderRef.current;
        if (loader) observer.observe(loader);
        
        return () => observer.disconnect();
    }, [isLoading, isFirstLoad]);
    
    if (isLoading && films.length === 0) return <SceletonList />;
    if (error && films.length === 0) return <div>Error: {error}</div>;
    
    return (
        <>
            <FilmCard films={films} />
            {!error && (
                <div ref={loaderRef} className={styles.Loading}>
                    {isLoading ? <div ><Loading /></div> : null}
                </div>
            )}
        </>
    );
}

export default FilmList;
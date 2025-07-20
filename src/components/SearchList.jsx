import React, { useState, useEffect } from "react";
import { useSearch } from "../contexts/useSearch";
import axios from 'axios';
import SkeletonList from "./SkeletonList";
import FilmCard from "./FilmCard";
import { useTheme } from "../contexts/ThemeContext";

export default function SearchList() {
    const { query, setFilmsToTitle } = useSearch();
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {lang} = useTheme()

    useEffect(() => {
        const controller = new AbortController();
        
        const search = async () => {
            setIsLoading(true);
            setError(null);
            
            if (query.trim() === '') {
                setFilms([]);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie`,
                    {
                        params: {
                            api_key: import.meta.env.VITE_API_KEY,
                            query: query,
                            language: lang
                        },
                        signal: controller.signal
                    }
                );
                
                const filteredFilms = response.data.results.filter(film => film.poster_path);
                setFilms(filteredFilms);

                if(filteredFilms.length>0){
                    setFilmsToTitle(filteredFilms);
                }else{
                    setFilmsToTitle('')
                }
                
                if (filteredFilms.length === 0) {
                    setError("No films found :(");
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Search error:', err);
                    setError("Failed to load films. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        const timerId = setTimeout(search, 500);

        return () => {
            controller.abort();
            clearTimeout(timerId);
        };
    }, [query]);

    if (isLoading) return <SkeletonList />;
    if (error) return <div className="error-message">{error}</div>;
    if (films.length === 0 && query) return <div className="no-results">No results found for "{query}"</div>;

    return <FilmCard films={films} />;
}
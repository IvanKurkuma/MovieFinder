import React from "react";
import { FaSearch } from "react-icons/fa";
import './SearchInput.scss';
import { useSearch } from "../contexts/useSearch";
import { useTranslate } from "../hooks/useTranslate";

export default function SearchInput({navState}) {
    const { query, toggleSearch, filmsToTitle } = useSearch();
    const {t} = useTranslate()

    const findSuggestion = () => {
        if (!query || !filmsToTitle?.length) return null;
        
        const lowerQuery = query.toLowerCase();
        const foundFilm = filmsToTitle.find(film => 
            film.title?.toLowerCase().startsWith(lowerQuery)
        );
        
        return foundFilm ? foundFilm.title : null;
    };

    const suggestion = findSuggestion();
    
    const getAddPart = () => {
        if (!suggestion) return '';
        return suggestion.slice(query.length);
    };

    return (
        <div style={{ position: "relative" }}>
            <FaSearch className='lupa' fill='white'/>
            <input 
                placeholder={t('headers.input')}
                type="text"
                value={query}
                onChange={(e) => toggleSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Tab' && suggestion) {
                        e.preventDefault();
                        toggleSearch(suggestion);
                    }
                }}
                style={{
                    position: 'relative',
                    backgroundColor: 'transparent' 
                }}
                disabled={navState!=='home'}
            />
            
            {suggestion && (
                <input
                    value={query + getAddPart()}
                    readOnly
                    style={{
                        position: "absolute",
                        top: 5.5,
                        left: 29,
                        opacity: 0.5,
                        pointerEvents: "none",
                        background: "transparent",
                        color: "#999",
                      
                    }}
                />
            )}
        </div>
    );
}
import React, {useState, useContext, createContext} from "react";


const SearchContext=createContext();

export const SearchProvider=({children})=>{
    const [isSearch, setIsSearch]= useState(false);
    const [query, setQuery]=useState('')
    const [filmsToTitle, setFilmsToTitle]=useState('')

    const toggleSearch=(inputQuery)=>{
        setIsSearch(inputQuery.trim()!='');
        setQuery(inputQuery);
    }

    const clearSearch = () => {
        setIsSearch(false);
        setQuery('');
    }

    return(
        <SearchContext.Provider value={{isSearch, query, filmsToTitle, setFilmsToTitle, toggleSearch, clearSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch=()=>useContext(SearchContext)
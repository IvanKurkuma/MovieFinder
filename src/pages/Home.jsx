import React, { useState } from "react";
import FilmList from "../components/FilmList";
import styles from './Home.module.scss'
import AccordionSort from '../components/AccordionSort'
import { useSearch } from "../contexts/useSearch";
import SearchList from "../components/SearchList";
import {useTranslate} from '../hooks/useTranslate'
import AccordionLang from '../components/AccordionLang'

function Home() {
    const [sort, setSort] = useState('popular');
    const {isSearch}= useSearch();
    const {t} = useTranslate()

    return (
        <main className={styles.main}>
            <h1>{t('main.title')}</h1>
            <div className={styles.listAndSort}>
                <div className={styles.leftArea}>
                    <AccordionSort sort={sort} setSort={setSort} />
                    <AccordionLang />
                </div>
                {isSearch?<SearchList/>:<FilmList sort={sort}/>}
            </div>
        </main>
    );
}

export default Home;
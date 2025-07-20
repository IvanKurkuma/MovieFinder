import {useState, useEffect} from 'react'
import { useTheme } from '../contexts/ThemeContext'

export const useTranslate = () =>{
    const {lang} = useTheme();
    const [translate, setTranslate]= useState({});

    useEffect(()=>{
        const loadTranslates= async ()=>{
            try { 
                const data = await import(`../locales/${lang}.json`);
                setTranslate(data.default || data);
            } catch (error) {
                console.error("Ошибка загрузки файла языка:", error);  
            }
        }
        loadTranslates()
    },[lang])

    const t = (key) => {
    const keys = key.split('.');
    let result = translate;

    for(const k of keys){
        result=result?.[k];
        if(result === undefined) return key;
    }
    return result || key
  };

  return { t };
}

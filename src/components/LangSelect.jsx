import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import '../App.module.scss'
import { useTheme } from '../contexts/ThemeContext';
import {useTranslate} from '../hooks/useTranslate'


function LangSelect() {
    const {lang, setLang}=useTheme()
    const {t} = useTranslate()
  return (
    <FormControl variant="standard" sx={{
       minWidth: 120,
       m: 1,
      '& .MuiSvgIcon-root': {
        color: 'var(--bg-color)',
      },
      backgroundColor: 'var(--txt-color)'
     }}>
      <Select
        MenuProps={{
          disableScrollLock: true
        }}
        sx={{
          '&:before, &:after': {
          borderBottom: '1px solid gray' 
          },
          '&:hover': {
            borderColor: 'var(--bg-color)'
          },
          color: 'var(--bg-color)',
          backgroundColor:'var(--txt-color)',
          fontWeight: '700'

        }}
        labelId="sort-select-label"
        id="sort-select"
        value={lang}
        label="Sort By"
        onChange={(e) => setLang(e.target.value)}
      >
        <MenuItem value="en-US">{t('main.accordion.language.options.en-US')}</MenuItem>
        <MenuItem value="ru-RU">{t('main.accordion.language.options.ru-RU')}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default LangSelect;
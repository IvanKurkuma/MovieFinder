import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import '../App.module.scss'
import { useTranslate } from '../hooks/useTranslate';

function SortButtons({ currentSort, onSortChange }) {
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
        value={currentSort}
        label="Sort By"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <MenuItem value="popular">{t('main.accordion.sort.options.popular')}</MenuItem>
        <MenuItem value="top_rated">{t('main.accordion.sort.options.toprated')}</MenuItem>
        <MenuItem value="now_playing">{t('main.accordion.sort.options.nowplaying')}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortButtons;
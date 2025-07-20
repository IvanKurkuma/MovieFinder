import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import '../App.module.scss'

export default function CircularColor() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" size={60} sx={{
        '& .MuiCircularProgress-circle':{
            color:'var(--txt-color)'
        }
      }} />
    </Stack>
  );
}
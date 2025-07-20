import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import '../App.module.scss'
import { GoPeople } from "react-icons/go";

export default function TextRating({startValue, vote_count}) {
  
    const value=Math.round(startValue)/2;

  const createVotage=()=>{
    const numStr=String(vote_count);
    if(numStr.length>=4){
      const lastNum=Math.round(vote_count/100)/10
      return `  ${lastNum}K`

    }else return `  ${vote_count}`
  }

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        sx={{
            '& .MuiRating-iconFilled': {
            color: '#ff6d75', 
            },
            '& .MuiRating-iconEmpty': {
            color: '#ffb3b8', 
            }
        }}
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}><GoPeople/>{createVotage()}</Box>
    </Box>
  );
}

import React from 'react';
import { Skeleton, Box, Stack } from '@mui/material';
import '../App.module.scss'

export default function SkeletonCard() {
  return (
    <Box
      sx={{
        width: 200,
        height: 426.8,
        borderRadius: 5,
        overflow: 'hidden',

        boxShadow: 'var(--box-shadow)'
      }}
    >
      <Skeleton
        variant="rectangular"
        width={200}
        height={300}
        animation="wave"
        sx={{ MozBorderRadiusTopleft: 5 }}
      />
      <Stack spacing={1} sx={{ mt: 2, ml: 1 }}>
        <Skeleton variant="text" width="90%" height={40} animation="wave"  />
        <Skeleton variant="text" width="70%" height={30} animation="wave" />
        <Skeleton variant="text" width="50%" height={20} animation="wave" />
      </Stack>
    </Box>
  );
}

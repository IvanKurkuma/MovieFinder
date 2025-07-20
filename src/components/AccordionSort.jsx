import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortButtons from './SortButtons';
import '../App.module.scss'
import { useTranslate } from '../hooks/useTranslate';

export default function AccordionSort({sort, setSort}) {
  const {t} = useTranslate()
  return (
    <div>
      <Accordion sx={{
        border: '1px solid rgba(75, 75, 75, 0.42)',
        background: 'var(--txt-color)',
        color: 'var(--bg-color)'
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'var(--bg-color)' }}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            minHeight: '40px',
            '& .MuiAccordionSummary-content': { 
              margin: '8px 0' 
            }
          }}
        >
          <Typography component="span" sx={{
            fontSize: '20px',
            fontWeight: 600,
          }}>{t('main.accordion.sort.title')}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          borderTop: '1px solid rgba(75, 75, 75, 0.42)',
          pt: 2
        }}>
          {t('main.accordion.sort.subtitle')}
          <SortButtons currentSort={sort} onSortChange={setSort} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AccordionComponent = ({ title='heyy', desc='hello', expand = false }) => {
    return (
        <>
          <Accordion expanded={expand}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box>{title}</Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box>
                  {desc}
                </Box>
            </AccordionDetails>
          </Accordion>
        </>
    );
};

export default AccordionComponent;
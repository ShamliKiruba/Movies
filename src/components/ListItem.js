import { Box, Typography, Grid } from '@mui/material';
import * as React from 'react';
import { isMobile } from '../common/helper';

const ListItem = ({ data = [], selectedIndex, index, fillData}) => {
    return (
        <Box 
            className={`list-container ${selectedIndex ? 'selectedIndex' : ''}`}
            key={index} 
            onClick={() => fillData(index)}
            sx={{
                borderBottom: isMobile() ? '' : '1px solid gray',
                backgroundColor: selectedIndex ? '#e7e7e7' : ''
            }}>
            <Box sx={{
                display: 'flex'
            }}>
                <Box className="list-item item-left">
                    <Typography>EPISODE - {data.episode_id}</Typography>
                </Box>
                <Box className="list-item item-center">
                    <Typography>Episode - {data.episode_id}  {data.title}</Typography>
                </Box>
                <Box className="list-item item-right" >
                    <Typography>{new Date(data.created).toLocaleDateString()}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default ListItem;
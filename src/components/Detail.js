
import * as React from 'react';
import { Box, Typography } from '@mui/material';

const Detail = ({ data = {} }) => {
    return (
        <Box>
            {
                Object.keys(data).length > 0 ? 
                <>
                    <Typography className='detail-item' variant="h6">{data.title}</Typography>
                    <Typography className='detail-item' variant="body1">{data.opening_crawl}</Typography>
                    <Typography className='detail-item' variant="subtitle2">Directed by: {data.director}</Typography>
                </> : 
                <Typography className='detail-item'>No movies to show</Typography>
            }
        </Box>
    );
}

export default Detail;
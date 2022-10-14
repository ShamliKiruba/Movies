import React, { useState } from 'react';
import { OutlinedInput } from '@mui/material';

const Search = ({ data = [], getDataFromSearch }) => {
    const [val, setVal] = useState('');
    return (
        <OutlinedInput
            role="search-input"
            id="search-input"
            value={val}
            placeholder="Type to search"
            onChange={(e) => {
                setVal(e.target.value);
                getDataFromSearch(e.target.value);
            }}
        />
    );
}

export default Search; 
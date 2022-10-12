import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ComboBox = ({ data = [], getDataFromSearch }) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data}
            onChange={(e) => {
                console.log('selected title', e.target.outerText); 
                getDataFromSearch(e.target.outerText);
            }}
            renderInput={(params) => <TextField {...params} label={"Type to Search"} />}
        />
    );
}

export default ComboBox; 
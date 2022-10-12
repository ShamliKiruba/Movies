import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = ({ handleChange }) => {
	const [value, setValue] = useState('created');

	const onChange = (e) => {
		setValue(e.target.value);
		handleChange(e.target.value)
	}

	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Sort By</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={value}
					label="Sort By:"
					onChange={onChange}
				>
					<MenuItem value={'created'}>Date</MenuItem>
					<MenuItem value={'title'}>Title</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

export default BasicSelect;
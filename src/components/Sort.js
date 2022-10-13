import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Sort = ({ handleChange }) => {
	const [value, setValue] = useState('');

	const onChange = (e) => {
		setValue(e.target.value);
		handleChange(e.target.value)
	}

	return (
		<Box>
			<FormControl fullWidth>
				<InputLabel id="simple-sort-label">Sort By</InputLabel>
				<Select
					labelId="simple-sort-label"
					id="simple-sort-id"
					data-testid="simple-sort"
					role="sort"
					value={value}
					label="Sort By"
					onChange={onChange}
				>
					<MenuItem value={'created'}>Date</MenuItem>
					<MenuItem value={'title'}>Title</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

export default Sort;
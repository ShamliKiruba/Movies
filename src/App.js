import React, { useEffect, useState } from 'react';
import { fetchData } from './common/API';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ComboBox from './components/AutoComplete';
import Sort from './components/Sort';
import Detail from './components/Detail';
import ListItem from './components/ListItem';
import AccordionComponent from './components/Accordion';
import './App.scss';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './common/theme';
import SAMPLE_DATA from './data.json';
import { isMobile } from './common/helper';
import { Typography } from '@mui/material';

const App = () => {
	const [data, setData] = useState(SAMPLE_DATA.results);
	const [dataSelectedIndex, setDataSelectedIndex] = useState();

	useEffect(() => {
		fetchData('https://swapi.dev/api/films/?format=json')
		.then((data) => {
			console.log(data.results);
			setData(data.results);
		});
	}, []);


	const fillDetailedViewData = (index) => {
		setDataSelectedIndex(index);
	};

	const searchedTitle = (title) => {
		data.map((item, index) => {
			if (item.title == title) {
				setDataSelectedIndex(index);
			}
		})
	};

	const handleSort = (sortBy) => {
		data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
		setData([...data]);
	}

	return (
		<ThemeProvider theme={theme}>
			<Box className='header-title'>
				<Typography variant='title'>Movies</Typography>
			</Box>
			<Box>
				<Grid container spacing={1} variant="header">
					<Grid item xs={4} md={2}>
						<Sort handleChange={handleSort} />
					</Grid>
					<Grid item xs={8} md={10}>
						<ComboBox 
							data={data.map(item => item.title )} 
							getDataFromSearch={searchedTitle} />
					</Grid>
				</Grid>
			</Box>
			<Box>
				{
					isMobile() ? (
						<>
							{
								data.map((item, index) => {
									return (
										<AccordionComponent
											expand={dataSelectedIndex === index}
											title={<ListItem 
														data={item}
														index={index}
														fillData={fillDetailedViewData} 
														selectedIndex={dataSelectedIndex === index}
													/>}
											desc={<Detail data={data[dataSelectedIndex]}/>}
										/>
									)
								})
							}
						</>
					) : (
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								{
									data.map((item, index) => {
										return (
											<ListItem key={index}
												data={item} index={index} fillData={fillDetailedViewData}
												selectedIndex={dataSelectedIndex === index}
											/>
										);
									})
								}
							</Grid>
							<Grid item xs={0} md={6}>
								<Detail data={data[dataSelectedIndex]}/>
							</Grid>
						</Grid>
					)
				}
			</Box>
		</ThemeProvider>
	);
}

export default App;

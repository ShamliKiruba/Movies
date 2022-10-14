
import React from 'react';
import { render, screen, fireEvent, act,cleanup,wait,  waitFor, within, waitForComponentToPaint, getAllByTitle } from '@testing-library/react';
import App from './App';
import SAMPLE_DATA from './data.json';
import * as API from '../src/common/API';

describe('Movie', () => {
	window.visualViewport = { width : 700 };

	beforeEach(() => {
		jest.spyOn(API, "fetchData").mockResolvedValue(SAMPLE_DATA);
	});

	afterEach(() => {
		cleanup;
	});

	test('renders project title', async () => {
		act(() =>{
			render(<App />);
	   	});
		await waitFor(() => {
			expect(API.fetchData).toHaveBeenCalled();
			const linkElement = screen.getByText(/Movie Blog/i);
			expect(linkElement).toBeInTheDocument();
		});
	});

	test('renders total of 6 list elements',  async () => {
		act(() =>{
			render(<App />);
	   	});
		await waitFor(() => {
			expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
		});
	});
	
	test('initial render with no default selection', async () => {
		act(() =>{
			render(<App />);
	   	});
		await waitFor(() => {
			let index = Math.floor(Math.random() * (5 - 0 + 0)) + 0;
			const items = screen.getAllByText(/No movies to show/i)[index];
			expect(items).toBeInTheDocument();
		});
	});
	
	test('check for data in list', async () => {
		let wrapper;
		act(() =>{
			const { container } = render(<App />);
			wrapper = container;
	   	});
		await waitFor(() => {
			const secondelement = wrapper.getElementsByClassName('list-container')[1].getElementsByClassName('list-item')[2].innerHTML;
			expect(secondelement).toContain('12/12/2014');
		});
	});
	
	test('fire click on list item 3 should render right pane', async () => {
		let wrapper;
		act(() =>{
			const { container } = render(<App />);
			wrapper = container;
	   	});
		await waitFor(() => {
			const thirdItem = wrapper.getElementsByClassName('list-container')[2];
			fireEvent.click(thirdItem);
			expect(screen.getByText(/Richard Marquand/)).toBeInTheDocument();
		});
	});
	
	
	test('test for accordion in mobile view', async () => {
			window.visualViewport = { width : 400 };
			let wrapper;
			act(() =>{
				const { container } = render(<App />);
				wrapper = container;
			});
			await waitFor(() => {
				const accordion = wrapper.getElementsByClassName('MuiAccordion-root');
				expect(accordion).toHaveLength(6);
			});
	});
	
	test('test for sorting - no default selection', async () => {
		let wrapper;
		act(() =>{
			const { container } = render(<App />);
			wrapper = container;
		});
		await waitFor(() => {
			const select = wrapper.getElementsByClassName('MuiSelect-select')[0];
			expect(select.innerHTML).toContain('');
		})
	});
	
	test('test for sorting - before and after', async () => {
		let wrapper;
		act(() =>{
			const { container } = render(<App />);
			wrapper = container;
		});
		await waitFor(() => {
			fireEvent.mouseDown(screen.getAllByLabelText("Sort By")[0]);
			const thirdItem = wrapper.getElementsByClassName('list-container')[1];
			expect(thirdItem.innerHTML).toContain('Empire Strike');
			fireEvent.click(screen.getByText("Title"));
			fireEvent.keyDown(document.activeElement, {
			key: "Escape",
			code: "Escape"
			});
			expect(thirdItem.innerHTML).toContain('Attack of the Clones');
		})
	});
	
	test('test for search', async () => {
		let wrapper;
		act(() =>{
			const { container } = render(<App />);
			wrapper = container;
		});
		await waitFor(() => {
			fireEvent.change(screen.getByPlaceholderText('Type to search'), { target: { value: 'Return' }});
			const firstElement = wrapper.getElementsByClassName('list-container')[0];
			expect(screen.getByText(/Return of the Jedi/)).toBeInTheDocument();
		});	
	});	
});
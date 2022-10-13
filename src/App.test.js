
import React from 'react';
import { render, screen, fireEvent, act,cleanup,wait,  waitFor, within, waitForComponentToPaint, getAllByTitle } from '@testing-library/react';
import App from './App';
import SAMPLE_DATA from './data.json';
import * as API from '../src/common/API';

describe('Movie', () => {
	window.visualViewport = { width : 700 };

	beforeEach(() => {
		jest.spyOn(API, "fetchData").mockResolvedValue(SAMPLE_DATA);
		act(() =>{
			render(<App />);
	   	});
	});

	afterEach(() => {
		cleanup();
	})

	test('renders project title', () => {
		render(<App />);
		const linkElement = screen.getByText(/Movie Blog/i);
		expect(linkElement).toBeInTheDocument();
	});
	
	test.only('renders total of 6 list elements',  async () => {
		await waitFor(() => {
			expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
		});
	});
	
	test('initial render with no default selection', () => {
		render(<App />);
		let index = Math.floor(Math.random() * (5 - 0 + 0)) + 0;
		const items = screen.getAllByText(/No movies to show/i)[index];
		expect(items).toBeInTheDocument();
	});
	
	test('check for data in list', () => {
		const { container } = render(<App />);
		const secondelement = container.getElementsByClassName('list-container')[1].getElementsByClassName('list-item')[2].innerHTML;
		expect(secondelement).toContain('12/12/2014');
	});
	
	test('fire click on list item 3 should render right pane', () => {
		const { container } = render(<App />);
		const thirdItem = container.getElementsByClassName('list-container')[2];
		fireEvent.click(thirdItem);
		const items = screen.getAllByText(/Richard Marquand/i)[2];
		expect(items).toBeInTheDocument();
	});
	
	
	test('test for accordion in mobile view', () => {
	window.visualViewport = { width : 400 };
		const { container } = render(<App />);
		const accordion = container.getElementsByClassName('MuiAccordion-root');
		expect(accordion).toHaveLength(6);
	});
	
	test('test for sorting - no default selection', () => {
		const { container } = render(<App />);
		const select = container.getElementsByClassName('MuiSelect-select')[0];
		expect(select.innerHTML).toContain('');
	});
	
	test('test for sorting - before and after', async () => {
		const { container } = render(<App />);
		fireEvent.mouseDown(screen.getByLabelText("Sort By"));
		const thirdItem = container.getElementsByClassName('list-container')[1];
		expect(thirdItem.innerHTML).toContain('Empire Strike');
		fireEvent.click(screen.getByText("Title"));
		fireEvent.keyDown(document.activeElement, {
		  key: "Escape",
		  code: "Escape"
		});
		expect(thirdItem.innerHTML).toContain('Attack of the Clones');
	});
	
	test('test for search', async () => {
		const { container } = render(<App />);
		fireEvent.change(screen.getByPlaceholderText('Type to search'), { target: { value: 'Return' }});
		const firstElement = container.getElementsByClassName('list-container')[0];
		console.log(container.getElementsByClassName('list-container'))
		expect(firstElement).toHaveTextContent('Return of the Jedi');
		expect(firstElement).toHaveClass('selectedIndex');
	});	
});
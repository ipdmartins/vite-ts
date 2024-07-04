// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import NewEvent from '../NewEvent';

describe('New Event', () => {
	let openModal: boolean;
	let setModalStatus: (_active: boolean) => void;
	let searchForEvents: () => void;

	beforeAll(() => {
		openModal = true;
		setModalStatus = vi.fn();
		searchForEvents = vi.fn();
	});

	it('should assert the title', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByText('New Event');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the name label', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByTestId('eventNameLbl');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the name input placeholder', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByPlaceholderText('Type event name');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the description label', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByText('Description');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the description placeholder', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByPlaceholderText(
			'Write if you have any special requests'
		);
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the dates label', () => {
		render(
			<NewEvent
				openModal={openModal}
				seModalStatus={setModalStatus}
				updateEventsList={searchForEvents}
			/>
		);
		const linkElement = screen.getByText('Select Dates');
		expect(linkElement).toBeInTheDocument();
	});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Event from '..';

describe('Events', () => {
	it('should assert the title', () => {
		render(<Event />);
		const linkElement = screen.getByText('Events');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the input text to search for an event', () => {
		render(<Event />);
		const linkElement = screen.getByPlaceholderText('Search for an event');
		expect(linkElement).toBeInTheDocument();
	});

	it('should assert the new event button', () => {
		render(<Event />);
		const linkElement = screen.getByRole('button', { name: 'New Event' });
		expect(linkElement).toBeInTheDocument();
	});
});

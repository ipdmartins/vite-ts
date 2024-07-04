// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Users from '.';

describe('Users', () => {
	it('should assert the title', () => {
		render(<Users />);
		const linkElement = screen.getByText('Users dashboard');
		expect(linkElement).toBeInTheDocument();
	});
});

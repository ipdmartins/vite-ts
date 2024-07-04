// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Sample from '.';

describe('Sample', () => {
	it('should assert the title', () => {
		render(<Sample />);
		const linkElement = screen.getByText('Sample page');
		expect(linkElement).toBeInTheDocument();
	});
});

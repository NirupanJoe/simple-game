/* eslint-disable react/display-name */
jest.mock('./components/game', () => () => <div role="game"/>);
jest.mock('./components/healthBar', () => () => <div role="healthBar"/>);

import { React } from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
	const { getByRole } = render(<App/>);

	expect(getByRole('game')).toBeInTheDocument();
	expect(getByRole('healthBar')).toBeInTheDocument();
});

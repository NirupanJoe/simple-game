/* eslint-disable react/display-name */

jest.mock('./components/game', () => () => <div role="game"/>);
jest.mock('./components/healthBar', () => () => <div role="healthBar"/>);

import React from 'react';
import { render } from '@testing-library/react';
import ticker from './services/ticker';
import App from './App';

test('renders learn react link', () => {
	jest.spyOn(React, 'useEffect');
	jest.spyOn(ticker, 'start').mockReturnValue();

	const { getByRole } = render(<App/>);

	expect(React.useEffect).toHaveBeenCalledWith(ticker.start, []);
	expect(getByRole('game')).toBeInTheDocument();
	expect(getByRole('healthBar')).toBeInTheDocument();
});

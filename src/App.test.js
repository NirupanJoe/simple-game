import { React } from 'react';
import { render } from '@testing-library/react';

/* eslint-disable react/display-name */
jest.mock('./components/game', () => () => <div role="game"/>);
import App from './App';

test('renders learn react link', () => {
	const { getByRole } = render(<App/>);

	expect(getByRole('game')).toBeInTheDocument();
});

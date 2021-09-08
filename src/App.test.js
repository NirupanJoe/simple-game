import { React } from 'react';
import { render, screen } from '@testing-library/react';

// NOTE: automock from jest config doesn't work on apps created with create-react-app.

import App from './App';

test('renders learn react link', () => {
	render(<App/>);
	const someText = screen.getByText('Simple Game');

	expect(someText).toBeInTheDocument();
});

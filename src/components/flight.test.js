import Flight from './flight';
import { render } from '@testing-library/react';

jest.mock('../core/context', () => ({
	state: { flight: { x: 100 }},
}));

describe('testing Flight', () => {
	test('flight is visible', () => {
		const component = render(Flight()).getByRole('flight');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('flight');
	});
});

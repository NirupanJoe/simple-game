/* eslint-disable max-lines-per-function */
import { render } from '@testing-library/react';
import Target from './target';

describe('Target', () => {
	const two = 2;

	test('renders the component with appropriate styling', () => {
		const target = {
			x: 10,
			y: 15,
			width: 20,
			height: 25,
		};
		const { x, y, width, height } = target;

		const { getByRole } = render(Target(target));

		const component = getByRole('targets');

		expect(component).toBeInTheDocument();
		expect(component).toHaveStyle({
			position: 'absolute',
			top: `${ y }%`,
			left: `${ x - (width / two) }%`,
			height: `${ height }vw`,
			width: `${ width }vw`,
		});
	});
});

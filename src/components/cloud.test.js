import Cloud from './cloud';
import { render } from '@testing-library/react';
import { rndBetween } from '@laufire/utils/random';

describe('clouds', () => {
	const hundred = 100;
	const x = rndBetween(0, hundred);
	const y = rndBetween(0, hundred);

	test('Cloud Renders', () => {
		const data = { x, y };
		const component = render(Cloud(data)).getByRole('cloud');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('cloud');
		expect(component).toHaveStyle({
			top: `${ y }%`,
			left: `${ x }%`,
		});
	});
});

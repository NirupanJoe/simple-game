import Cloud from './cloud';
import { render } from '@testing-library/react';

describe('Cloud Test', () => {
	test('Cloud Test', () => {
		const data = { x: 5, y: 10 };

		const component = render(Cloud(data)).getByRole('cloud');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('cloud');
		expect(component).toHaveStyle({
			top: `${ data.y }%`,
			left: `${ data.x }%`,
		});
	});
});

import { render } from '@testing-library/react';
import Target from './target';
import targetManager from '../services/targetManager/index';

describe('Target', () => {
	const two = 2;

	test('renders the component with appropriate styling', () => {
		const target = targetManager.getTargets();
		const { x, y, width, height, filter } = target;

		const { getByRole } = render(Target(target));

		const component = getByRole('targets');

		expect(component).toBeInTheDocument();
		expect(component).toHaveStyle({
			top: `${ y }%`,
			left: `${ x - (width / two) }%`,
			height: `${ height }vw`,
			width: `${ width }vw`,
			filter: `hue-rotate(${ filter }deg)`,
		});
	});
});

import { render } from '@testing-library/react';
import Target from './target';
import targetManager from '../services/targetManager/index';
import PositionService from '../services/positionService';

describe('Target', () => {
	const returnValue = 'return';

	test('renders the component with appropriate styling', () => {
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);

		const target = targetManager.getTargets();
		const { y, width, height, filter } = target;

		const { getByRole } = render(Target(target));

		const component = getByRole('targets');

		expect(component).toBeInTheDocument();
		expect(component).toHaveStyle({
			top: `${ y }%`,
			left: `${ returnValue }%`,
			height: `${ height }vw`,
			width: `${ width }vw`,
			filter: `hue-rotate(${ filter }deg)`,
		});
		expect(PositionService.project).toHaveBeenCalledWith(target);
	});
});

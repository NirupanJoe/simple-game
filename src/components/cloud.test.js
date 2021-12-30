import Cloud from './cloud';
import { render } from '@testing-library/react';
import { rndBetween } from '@laufire/utils/random';
import PositionService from '../services/positionService';

describe('clouds', () => {
	const hundred = 100;
	const width = rndBetween(0, hundred);
	const height = rndBetween(0, hundred);

	test('Cloud Renders', () => {
		const data = { width, height };

		const project = {
			x: rndBetween(0, hundred),
			y: rndBetween(0, hundred),
		};

		jest.spyOn(PositionService, 'project')
			.mockReturnValue(project);

		const component = render(Cloud(data)).getByRole('cloud');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('cloud');
		expect(component).toHaveStyle({
			top: `${ project.y }%`,
			left: `${ project.x }%`,
			height: `${ height }%`,
			width: `${ width }%`,
		});
		expect(PositionService.project)
			.toHaveBeenCalledWith(data);
	});
});

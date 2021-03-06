import PositionService from '../services/positionService';
import backgroundObject from './backgroundObject';
import { render } from '@testing-library/react';
import { rndBetween } from '@laufire/utils/lib';
import { rndString } from '@laufire/utils/random';

test('test backgroundObjects', () => {
	const data = {
		height: rndBetween(),
		width: rndBetween(),
		type: rndString(),
		image: rndString(),
	};

	const projectedValue = {
		x: rndBetween(),
		y: rndBetween(),
	};

	const style = {
		top: `${ projectedValue.y }%`,
		left: `${ projectedValue.x }%`,
		height: `${ data.height }vw`,
		width: `${ data.width }vw`,

	};

	jest.spyOn(PositionService, 'project').mockReturnValue(projectedValue);

	const component = render(backgroundObject(data))
		.getByRole('backgroundObject');

	expect(component).toHaveStyle(style);
	expect(component).toHaveClass(data.type);
	expect(component).toHaveAttribute('src', data.image);
	expect(PositionService.project).toHaveBeenCalledWith(data);
	expect(component).toBeInTheDocument();
});

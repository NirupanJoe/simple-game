import { render } from '@testing-library/react';
import Bullet from './bullet';
import PositionService from '../services/positionService';
import bulletImg from '../images/bullet.png';
import { rndBetween } from '@laufire/utils/random';

describe('test bullets', () => {
	const returnValue = {
		x: rndBetween(),
		y: rndBetween(),
	};

	test('bullet is rendered when type normal', () => {
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);

		const bullet = { id: 'id',
			type: 'normal',
			x: 100,
			y: 100,
			height: 2,
			width: 1,
			image: bulletImg,
			hue: 0 };

		const component = render(Bullet(bullet)).getByRole('bullet');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('bullet');
		expect(component).toHaveStyle({ height: `${ bullet.height }vw`,
			width: `${ bullet.width }vw`,
			left: `${ returnValue.x }%`,
			top: `${ returnValue.y }%`,
			filter: `hue-rotate(${ bullet.color }deg)` });
		expect(PositionService.project).toBeCalledWith(bullet);
		expect(component).toHaveAttribute('src', bulletImg);
	});
});

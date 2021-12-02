/* eslint-disable max-lines-per-function */
import { render } from '@testing-library/react';
import Bullet from './bullet';
import PositionService from '../services/positionService';
import bulletImg from '../images/bullet.png';

describe('test bullets', () => {
	const returnValue = 'returnValue';

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
			left: `${ returnValue }%`,
			top: `${ bullet.y }%`,
			filter: `hue-rotate(${ bullet.color }deg)` });
		expect(PositionService.project).toBeCalledWith(bullet);
		expect(component).toHaveAttribute('src', bulletImg);
	});
});

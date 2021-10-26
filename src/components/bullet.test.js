/* eslint-disable max-lines-per-function */
import { render } from '@testing-library/react';
import Bullet from './bullet';

jest.mock('../core/context', () => ({
	state: { bullets: [{
		id: 'id',
		type: 'normal',
		x: 100,
		y: 100,
		height: 2,
		width: 1,
	}] },
}));

describe('test bullets', () => {
	test('bullet is rendered when type normal', () => {
		const component = render(Bullet()).getByRole('bullet');
		const bullet = { type: 'normal',
			x: 100, y: 100, height: 2, width: 1 };
		const typeComponents = {
			normal: {
				image: 'bullet.png',
				left: 0,
			},
		};

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('bullet');
		expect(component).toHaveStyle({ height: `${ bullet.height }vw`,
			width: `${ bullet.width }vw`,
			left: `${ bullet.x - typeComponents[bullet.type].left }%`,
			top: `${ bullet.y }%` });
		expect(component).toHaveAttribute('src',
			typeComponents.normal.image);
	});
});

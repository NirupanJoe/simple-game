import { render } from '@testing-library/react';
import Bullet from './bullet';
import config from '../core/config';

jest.mock('../core/context', () => ({
	state: { bullets: [{
		id: 'id',
		type: 'normal',
		x: 100,
		y: 100,
	}] },
}));

describe('test bullets', () => {
	test('bullet is rendered when type normal', () => {
		const component = render(Bullet()).getByRole('bullet');
		const bullet = { type: 'normal', x: 100, y: 100 };
		const typeComponents = {
			normal: {
				image: 'bullet.png',
				left: 0,
			},
		};

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('bullet');
		expect(component).toHaveStyle({ height: '2vw',
			width: `${ config.bulletWidth }vw`,
			left: `${ bullet.x - typeComponents[bullet.type].left }%`,
			top: `${ bullet.y }%` });
		expect(component).toHaveAttribute('src',
			typeComponents.normal.image);
	});
});

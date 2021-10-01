import { render } from '@testing-library/react';
import leftBullet from './leftBullet';

describe('Left Bullet', () => {
	test('to display Left Bullet', () => {
		const component = render(leftBullet()).getByRole('leftBullet');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('leftBullet');
	});
});

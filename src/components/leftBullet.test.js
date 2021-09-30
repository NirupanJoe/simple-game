import { render } from '@testing-library/react';
import leftBullet from './leftBullet';

describe('score card', () => {
	test('to Check score card', () => {
		const component = render(leftBullet()).getByRole('leftBullet');

		expect(component).toHaveClass('leftBullet');
	});
});

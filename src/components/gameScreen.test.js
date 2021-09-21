import GameScreen from './gameScreen';
import { render } from '@testing-library/react';

jest.mock('../core/context', () => ({
	state: { health: 40 },
}));

describe('testing GameScreen', () => {
	test('gameScreen visible', () => {
		const component = render(GameScreen()).getByRole('gameScreen');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('game-screen');
	});

	test('gameScreen renders healthBar and score', () => {
		const { getByRole } = render(GameScreen());

		expect(getByRole('healthBar')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();
	});
});

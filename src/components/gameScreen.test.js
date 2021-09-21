/* eslint-disable max-lines-per-function */
import GameScreen from './gameScreen';
import { render, fireEvent } from '@testing-library/react';
import context from '../core/context';

jest.mock('../core/context', () => ({
	state: { health: 40,
		bgnScreenY: 0,
		flight: {
			x: 0,
		}},
	actions: { updateMousePosition: jest.fn() },
}));

describe('testing GameScreen', () => {
	const { actions } = context;

	test('gameScreen visible', () => {
		const component = render(GameScreen()).getByRole('gameScreen');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('game-screen');
		expect(component).toHaveStyle({
			backgroundPositionY: `${ context.state.bgnScreenY }%`,
		});
	});

	test('gameScreen renders healthBar and score', () => {
		const { getByRole } = render(GameScreen());

		expect(getByRole('healthBar')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();
		expect(getByRole('flight')).toBeInTheDocument();
	});

	test('event check', () => {
		jest.spyOn(actions, 'updateMousePosition');

		const component = render(GameScreen()).getByRole('gameScreen');

		fireEvent.mouseMove(component);

		expect(actions.updateMousePosition).toHaveBeenCalled();
	});
});

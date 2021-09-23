/* eslint-disable max-lines-per-function */
/* eslint-disable react/display-name */
jest.mock('../core/context', () => ({
	state: { bgnScreenY: 0 },
	actions: { updateMousePosition: jest.fn() },
}));

jest.mock('../components/healthBar', () => () => <div role="healthBar"/>);
jest.mock('../components/score', () => () => <div role="score"/>);
jest.mock('../components/flight', () => () => <div role="flight"/>);

import { React } from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameScreen from './gameScreen';
import context from '../core/context';

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

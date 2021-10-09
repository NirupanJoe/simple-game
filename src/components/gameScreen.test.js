/* eslint-disable max-lines-per-function */
/* eslint-disable react/display-name */
jest.mock('../core/context', () => ({
	state: { bgnScreenY: 0, objects: [] },
	actions: { updateMousePosition: jest.fn() },
}));

jest.mock('../components/healthBar', () => () => <div role="healthBar"/>);
jest.mock('../components/score', () => () => <div role="score"/>);
jest.mock('../components/flight', () => () => <div role="flight"/>);

import { React } from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameScreen from './gameScreen';
import context from '../core/context';
import * as Container from './container';
import Target from './target';
import Cloud from '../components/cloud';

describe('testing GameScreen', () => {
	const { actions } = context;

	test('gameScreen visible', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
		const component = render(GameScreen()).getByRole('gameScreen');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('game-screen');
		expect(component).toHaveStyle({
			backgroundPositionY: `${ context.state.bgnScreenY }%`,
		});
	});

	test('gameScreen renders healthBar and score', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
		const { getByRole } = render(GameScreen());

		expect(getByRole('healthBar')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();
		expect(getByRole('flight')).toBeInTheDocument();
	});

	test('event check', () => {
		jest.spyOn(actions, 'updateMousePosition');
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
		const component = render(GameScreen()).getByRole('gameScreen');

		fireEvent.mouseMove(component);

		expect(actions.updateMousePosition).toHaveBeenCalled();
	});

	test('gameScreen renders the board,targets,powers', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);

		const { getByRole } = render(GameScreen());

		expect(getByRole('targets')).toBeInTheDocument();

		expect(Container.default)
			.toHaveBeenCalledWith(context.state.targets, Target);
	});

	test('Cloud Map Test', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
			
		jest.spyOn(context.state.objects, 'map')
			.mockReturnValue(<div role="Cloud"/>);

		const component = render(GameScreen()).getByRole('Cloud');

		expect(context.state.objects.map).toHaveBeenCalledWith(Cloud);
		expect(component).toBeInTheDocument();
	});
});

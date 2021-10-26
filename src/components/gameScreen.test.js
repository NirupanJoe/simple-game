/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/display-name */

jest.mock('../core/context', () => ({
	state: { bgnScreenY: 0, objects: [] },
	actions: { updateMousePosition: jest.fn(),
		generateBullets: jest.fn(),
		updateFlightPosition: jest.fn() },
}));

jest.mock('../components/healthBar', () => () => <div role="healthBar"/>);
jest.mock('../components/score', () => () => <div role="score"/>);
jest.mock('../components/flight', () => () => <div role="flight"/>);
jest.mock('../components/bullet', () => () => <div role="bullet"/>);

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

	test('gameScreen renders healthBar, score, flight, bullet', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
		const { getByRole } = render(GameScreen());

		expect(getByRole('healthBar')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();
		expect(getByRole('flight')).toBeInTheDocument();
		expect(getByRole('bullet')).toBeInTheDocument();
	});

	test('event check', () => {
		jest.spyOn(actions, 'updateMousePosition');
		jest.spyOn(actions, 'updateFlightPosition');
		jest.spyOn(Container, 'default')
			.mockReturnValue(<div role="targets"/>);
		jest.spyOn(actions, 'generateBullets');

		const component = render(GameScreen()).getByRole('gameScreen');

		const mouseEvent = { _reactName: 'onMouseMove', type: 'mousemove' };
		const clickEvent = { _reactName: 'onClick', type: 'click' };

		fireEvent.mouseMove(component, mouseEvent);
		fireEvent.click(component, clickEvent);

		expect(actions.updateMousePosition).toHaveBeenCalledWith(expect
			.objectContaining(mouseEvent));
		expect(actions.updateFlightPosition).toHaveBeenCalledWith();
		expect(actions.generateBullets).toHaveBeenCalledWith(expect
			.objectContaining(clickEvent));
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

/* eslint-disable react/display-name */
jest.mock('./3dMode/3dMode', () => () => <div role="3d"/>);
jest.mock('./2dMode/2dMode', () => () => <div role="2d"/>);

import React from 'react';
import { rndString, rndValue } from '@laufire/utils/random';
import { render, fireEvent } from '@testing-library/react';
import * as getMode from '../services/urlService';
import GameScreen from './gameScreen';
import { collection } from '@laufire/utils';
import shortcutScreens from './shortcutScreens';

describe('testing GameScreen', () => {
	const context = {
		state: {
			bgnScreenY: rndString(),
		},
		actions: {
			updateMousePosition: jest.fn(),
			updateFlightPosition: jest.fn(),
			generateBullets: jest.fn(),
		},
	};
	const { actions } = context;
	const GameMode = ['3d', '2d'];
	const rndMode = rndValue(GameMode);

	test('gameScreen visible', () => {
		const shortcutListComponent = collection.values(collection
			.map(shortcutScreens, () =>
				<div key={ rndString() } role={ rndString() }/>));
		const mapReturnValue = <div role="mapReturnValue"/>;

		jest.spyOn(collection, 'map').mockImplementation((s, Component) => {
			<Component { ...context }/>;
		})
			.mockReturnValue(mapReturnValue);
		jest.spyOn(collection, 'values')
			.mockReturnValue(shortcutListComponent);
		jest.spyOn(getMode, 'default').mockReturnValue(rndMode);
		const component = render(GameScreen(context)).getByRole('gameScreen');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('game-screen');
		shortcutListComponent.map((shortcutComponent, i) => {
			expect(render(GameScreen(context))
				.getAllByRole(shortcutComponent.props.role)[i])
				.toBeInTheDocument();
		});
	});

	test('event check', () => {
		jest.spyOn(actions, 'updateMousePosition');
		jest.spyOn(actions, 'updateFlightPosition');
		jest.spyOn(actions, 'generateBullets');
		jest.spyOn(getMode, 'default').mockReturnValue(rndMode);

		const component = render(GameScreen(context)).getByRole('gameScreen');

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

	test('gameMode', () => {
		jest.spyOn(getMode, 'default').mockReturnValue(rndMode);

		const { getByRole } = render(GameScreen(context));

		expect(getByRole('gameScreen')).toBeInTheDocument();
		expect(getByRole(rndMode)).toBeInTheDocument();
		expect(getMode.default).toHaveBeenCalledWith(context);
	});
});

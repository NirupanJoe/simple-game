/* eslint-disable react/display-name */

jest.mock('../components/gameScreen', () => () => <div role="gameScreen"/>);
jest.mock('../components/gameOverScreen', () => () =>
	<div role="game-over-screen"/>);
jest.mock('./3dMode/3dMode', () => () => <div role="3d"/>);
jest.mock('../services/playerManger');

import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/game';
import playerManager from '../services/playerManger';
import * as getMode from '../services/urlService';
import { keys } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';

describe('Game in Dom', () => {
	const context = Symbol('context');

	test(' Game Over Screen', () => {
		jest.spyOn(playerManager, 'isAlive').mockReturnValue(false);
		const { getByRole } = render(Game(context));

		expect(getByRole('game')).toBeInTheDocument();
		expect(getByRole('game-over-screen')).toBeInTheDocument();
		expect(playerManager.isAlive).toHaveBeenCalledWith(context);
		expect(getByRole('game')).toHaveClass('game');
	});

	describe(' Game Alive Screen', () => {
		const GameMode = {
			'3d': '3d',
			'2d': 'gameScreen',
		};
		const rndMode = rndValue(keys(GameMode));

		test('gameMode', () => {
			jest.spyOn(getMode, 'default').mockReturnValue(rndMode);
			jest.spyOn(playerManager, 'isAlive').mockReturnValue(true);

			const { getByRole } = render(Game(context));

			expect(getByRole('game')).toBeInTheDocument();
			expect(getByRole(GameMode[rndMode])).toBeInTheDocument();
			expect(playerManager.isAlive).toHaveBeenCalledWith(context);
			expect(getMode.default).toHaveBeenCalledWith(context);
		});
	});
});

/* eslint-disable react/display-name */

jest.mock('../components/gameScreen', () => () => <div role="gameScreen"/>);
jest.mock('../components/gameOverScreen', () => () =>
	<div role="game-over-screen"/>);
jest.mock('../services/playerManger');

import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/game';
import playerManager from '../services/playerManger';

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

	test(' Game Alive Screen', () => {
		jest.spyOn(playerManager, 'isAlive').mockReturnValue(true);
		const { getByRole } = render(Game(context));

		expect(getByRole('game')).toBeInTheDocument();
		expect(getByRole('gameScreen')).toBeInTheDocument();
		expect(playerManager.isAlive).toHaveBeenCalledWith(context);
	});
});

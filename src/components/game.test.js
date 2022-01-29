import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/game';
import playerManager from '../services/playerManager';
import * as GameOverScreen from './gameOverScreen';
import * as GameScreen from './gameScreen';
import * as WelcomeScreen from './welcomeScreen';

describe('Game', () => {
	describe('readyScreens is true', () => {
		const state = {
			ready: true,
		};
		const context = { state };

		test(' Game Over Screen', () => {
			jest.spyOn(GameOverScreen, 'default')
				.mockReturnValue(<div role="gameOverScreen"/>);
			jest.spyOn(playerManager, 'isAlive').mockReturnValue(false);

			const { getByRole } = render(Game(context));

			expect(getByRole('game')).toBeInTheDocument();
			expect(getByRole('game')).toHaveClass('game');
			expect(playerManager.isAlive).toHaveBeenCalledWith(context);
			expect(getByRole('gameOverScreen')).toBeInTheDocument();
			expect(GameOverScreen.default).toHaveBeenCalledWith(context);
		});

		test(' Game Alive Screen', () => {
			jest.spyOn(playerManager, 'isAlive').mockReturnValue(true);
			jest.spyOn(GameScreen, 'default')
				.mockReturnValue(<div role="gameScreen"/>);

			const { getByRole } = render(Game(context));

			expect(getByRole('game')).toBeInTheDocument();
			expect(playerManager.isAlive).toHaveBeenCalledWith(context);
			expect(getByRole('gameScreen')).toBeInTheDocument();
			expect(GameScreen.default).toHaveBeenCalledWith(context);
		});
	});

	test('readyScreens is false', () => {
		const state = {
			ready: false,
		};
		const context = { state };

		jest.spyOn(WelcomeScreen, 'default')
			.mockReturnValue(<div role="welcomeScreen"/>);

		const { getByRole } = render(Game(context));

		expect(getByRole('welcomeScreen')).toBeInTheDocument();
		expect(WelcomeScreen.default).toHaveBeenCalledWith(context);
	});
});

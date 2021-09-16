/* eslint-disable react/display-name */
jest.mock('./restart', () => () => <div role="restart"/>);
jest.mock('../components/score', () => () => <div role="score"/>);
jest.mock('../services/playerManger');

import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/game';
import context from '../core/context';
import playerManager from '../services/playerManger';

describe('Game in Dom', () => {
	test(' Game Over Screen', () => {
		jest.spyOn(playerManager, 'isAlive').mockReturnValue(false);
		const { getByRole } = render(Game());

		expect(getByRole('game')).toBeInTheDocument();
		expect(getByRole('restart')).toBeInTheDocument();
		expect(playerManager.isAlive).toHaveBeenCalledWith(context);
	});

	test(' Game Alive Screen', () => {
		jest.spyOn(playerManager, 'isAlive').mockReturnValue(true);
		const { getByRole } = render(Game());

		expect(getByRole('game')).toBeInTheDocument();
		expect(playerManager.isAlive).toHaveBeenCalledWith(context);
	});

	test('Game Score', () => {
		const { getByRole } = render(Game());

		expect(getByRole('score')).toBeInTheDocument();
	});
});

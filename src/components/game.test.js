/* eslint-disable react/display-name */
jest.mock('./restart', () => () => <div role="restart"/>);
jest.mock('../services/playerManger');
jest.mock('../core/context', () => ({
	state: { health: 100 },
}));

import React from 'react';
import { render } from '@testing-library/react';
import Game from '../components/game';
import context from '../core/context';
import playerManager from '../services/playerManger';

jest.mock('../core/context', () => ({
	state: { health: 100,
		flight: { x: 10 }},
}));

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
		expect(getByRole('gameScreen')).toBeInTheDocument();
		expect(playerManager.isAlive).toHaveBeenCalledWith(context);
	});
});

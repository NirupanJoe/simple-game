/* eslint-disable max-statements */

jest.mock('../core/context', () => ({
	state: { score: 0 },
}));

import GameOverScreen from '../components/gameOverScreen';
import { render } from '@testing-library/react';
import { React } from 'react';
import context from '../core/context';
import * as Restart from './restart';

describe('testing GameOverScreen', () => {
	test('gameOverScreen visible', () => {
		jest.spyOn(Restart, 'default')
			.mockReturnValue(<div role="restartButton"/>);
		const { getByRole } = render(GameOverScreen());

		expect(getByRole('game-over-screen')).toBeInTheDocument();
		expect(getByRole('game-over-screen')).toHaveClass('game-over-screen');

		expect(getByRole('game-over')).toBeInTheDocument();
		expect(getByRole('game-over')).toHaveClass('game-over');
		expect(getByRole('restartButton')).toBeInTheDocument();
		expect(Restart.default).toHaveBeenCalledWith();

		expect(getByRole('score')).toBeInTheDocument();
		expect(getByRole('score')).toHaveClass('game-score');
		expect(getByRole('score')).toHaveTextContent(`SCORE: ${ context.state.score }`);
	});
});

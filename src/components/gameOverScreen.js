import { React } from 'react';
import Restart from './restart';
import '../App.scss';
import context from '../core/context';

const GameOverScreen = () =>
	<div className="game-over-screen" role="game-over-screen">
		<div className="game-over" role="game-over"> GAME OVER </div>
		{ Restart() }
		<div className="game-score" role="score">
			SCORE: {context.state.score}</div>
	</div>;

export default GameOverScreen;

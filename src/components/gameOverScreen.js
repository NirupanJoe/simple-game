import { React, useEffect } from 'react';
import Restart from './restart';
import '../App.scss';
import context from '../core/context';
import { useCookies } from 'react-cookie';

const GameOverScreen = () => {
	const [cookies, setCookie] = useCookies(['score']);

	useEffect(() => {
		!cookies.score && setCookie('score', context.state.score);
		context.state.score > cookies.score
		&& setCookie('score', context.state.score);
	}, [cookies]);

	return <div className="game-over-screen" role="game-over-screen">
		<div className="game-over" role="game-over"> GAME OVER </div>
		<Restart/>
		<div className="game-score" role="score">
			SCORE: {context.state.score}
		</div>
	</div>;
};

export default GameOverScreen;

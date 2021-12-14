import React from 'react';
import getMode from '../services/urlService';
import TwoDMode from './2dMode/2dMode';
import ThreeDMode from './3dMode/3dMode';

const style = (context) => ({
	backgroundPositionY: `${ context.state.bgnScreenY }%`,
});

const GameMode = {
	'3d': ThreeDMode,
	'2d': TwoDMode,
};

const GameScreen = (context) =>
	<div
		role="gameScreen"
		className="game-screen"
		style={ style(context) }
		onMouseMove={ (event) => {
			context.actions.updateMousePosition(event);
			context.actions.updateFlightPosition();
		} }
		onClick={ (event) => context.actions.generateBullets(event) }
	>
		{GameMode[getMode(context)](context)}
	</div>;

export default GameScreen;

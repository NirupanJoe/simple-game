import React from 'react';
import getMode from '../services/urlService';
import TwoDMode from './2dMode/2dMode';
import ThreeDMode from './3dMode/3dMode';
import shortcutScreens from './shortcutScreens';
import { map, values } from '@laufire/utils/collection';

const GameMode = {
	'3d': ThreeDMode,
	'2d': TwoDMode,
};

const GameScreen = (context) => {
	const Mode = GameMode[getMode(context)];

	return (
		<div
			role="gameScreen"
			className="game-screen"
			onMouseMove={ (event) => {
				context.actions.updateMousePosition(event);
				context.actions.updateFlightPosition();
			} }
			onClick={ (event) => !context.state.playPause
				&& context.actions.generateBullets(event) }
		>
			<Mode { ...context }/>
			{values(map(shortcutScreens, (Component, key) =>
				<Component key={ key } { ...context }/>))}
		</div>
	);
};

export default GameScreen;

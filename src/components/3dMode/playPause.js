import React from 'react';
import { degreeToRad } from '../../services/helperService';
import { Text } from '@react-three/drei';
import PositionService from '../../services/positionService';

const degree = -90;

const groupProps = (context) => {
	const { config: { playPause }} = context;
	const { x, z } = PositionService
		.threeDProject({ ...context, data: playPause });

	return {
		'rotation-x': degreeToRad(degree),
		'position': [x, 1, z],
	};
};

const PlayPause = (context) => {
	const { state, actions } = context;
	const textProps = {
		font: `${ process.env.PUBLIC_URL }/Symbola.ttf`,
		fontSize: 0.4,
		text: '\u23ef',
		color: 'black',
	};

	return (
		<group
			{ ...groupProps(context) }
			onClick={ () => actions.setPlayPause(!state.playPause) }
		>
			<Text { ...textProps }/>
		</group>
	);
};

export default PlayPause;

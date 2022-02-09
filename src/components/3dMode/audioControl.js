import { React } from 'react';
import { Plane, useTexture } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';
import PositionService from '../../services/positionService';

const degree = -90;

const getTexture = {
	true: 'unmute',
	false: 'mute',
};

const props = (context) => {
	const { x, z, width, height } = PositionService
		.threeDProject({ ...context, data: context.config.audioControl });

	return {
		rotation: [degreeToRad(degree), 0, 0],
		position: [x, 1, z],
		args: [width, height],
	};
};

const AudioControl = (context) => {
	const { state, actions } = context;
	const texture = useTexture(`${ process.env
		.PUBLIC_URL }/audio/${ getTexture[state.audio] }.png`);
	const { args, ...groupProps } = props(context);

	return (
		<group { ...groupProps }>
			<Plane
				{ ...{ args } }
				onClick={ () => actions.setAudio(!state.audio) }
			>
				<meshStandardMaterial map={ texture } transparent={ true }/>
			</Plane>
		</group>
	);
};

export default AudioControl;

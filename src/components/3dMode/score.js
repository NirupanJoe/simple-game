import { React } from 'react';
import { Text } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';
import PositionService from '../../services/positionService';

const meshProps = (context) => {
	const { x, z } = PositionService.threeDProject({ ...context,
		data: context.config.scorePosition });
	const degree = -90;

	return {
		rotation: [degreeToRad(degree), 0, 0], position: [x, 1, z],
	};
};

const textProps = ({ state }) => ({
	text: `Score: ${ state.score }`,
	fontSize: 0.2,
	color: 'black',
	anchorX: 'right',
});

const Score = (context) =>
	<group { ...meshProps(context) }>
		<Text { ...textProps(context) }/>
	</group>;

export default Score;

import { React } from 'react';
import { Plane, Text } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';
import PositionService from '../../services/positionService';
import GameService from '../../services/gameService';

const planeOneProps = ({ config: { healthPosition: { height, width }}}) => {
	const increase = 0.05;

	return {
		args: [width + increase, height + increase, 1],
	};
};

const planeTwoProps = (context) => {
	const { config: { healthPosition: { height }}} = context;
	const { width, XPosition } = PositionService.getHealthProps(context);

	return {
		args: [width, height, 1],
		position: [XPosition, 0, 0],
	};
};

const groupProps = (context) => {
	const { x, z } = PositionService.threeDProject({ ...context,
		data: context.config.healthPosition });
	const degree = -90;

	// eslint-disable-next-line no-console
	console.log(x, z);
	return {
		rotation: [degreeToRad(degree), 0, 0],
		position: [x, 1, z],
	};
};

const textProps = ({ state }) => ({
	text: GameService.ceilHealth(state.health),
	fontSize: 0.2,
	color: 'black',
});

const HealthBar = (context) => {
	const { state: { health }} = context;
	const color = GameService.healthColor(health);

	return (
		<group { ...groupProps(context) }>
			<Plane { ...planeOneProps(context) }/>;
			<Plane { ...planeTwoProps(context) }>
				<meshStandardMaterial color={ color }/>
			</Plane>
			<Text { ...textProps(context) }/>
		</group>
	);
};

export default HealthBar;

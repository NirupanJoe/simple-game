import { React } from 'react';
import { Plane, Text } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';
import { useSpring, a } from '@react-spring/three';
import animation from './animation/animation';
import PositionService from '../../services/positionService';
import GameService from '../../services/gameService';

const planeOneProps = ({ config: { healthPosition: { height, width }}}) => {
	const increase = 0.05;

	return {
		args: [width + increase, height + increase, 1],
	};
};

const planeTwoProps = ({ state, config: { health, healthPosition }}) => {
	const scale = 1 / health;
	const height = healthPosition.height / scale;

	return {
		args: [state.health, height, 1],
		scale: scale,
	};
};

const meshProps = (context) => {
	const { x, z } = PositionService.threeDProject({ ...context,
		data: context.config.healthPosition });
	const degree = -90;

	return {
		rotation: [degreeToRad(degree), 0, 0], position: [x, 1, z],
	};
};

const textProps = ({ state }) => ({
	text: GameService.ceilHealth(state.health),
	fontSize: 0.2,
	color: 'black',
});

const HealthBar = (context) => {
	const { state } = context;
	const { color } = useSpring(animation.healthBar(state));

	return (
		<mesh { ...meshProps(context) }>
			<Plane { ...planeOneProps(context) }/>;
			<Plane { ...planeTwoProps(context) }>
				<a.meshStandardMaterial color={ color }/>
			</Plane>
			<Text { ...textProps(context) }/>
		</mesh>
	);
};

export default HealthBar;

import { config } from '@react-spring/three';
import GameService from '../../../services/gameService';
import { changeColor } from '../../../services/helperService';

const bulletXRotation = 30;
const bulletYRotation = 360;
const flightYRotation = 3.1;
const targetXRotation = 4.5;
const targetZRotation = 4.7;

const animation = {
	target: ({ x, y, z, color }) => ({
		loop: true,
		from: {
			position: [x, y, z],
		},
		rotation: [targetXRotation, 0, targetZRotation],
		color: `#${ changeColor(color) }`,
		config: config.wobbly,

	}),

	flight: ({ x, y, z }) => ({
		loop: true,
		from: {
			position: [x, y, z],
		},
		rotation: [0, flightYRotation, 0],
		position: [x, y, z],
		config: config.wobbly,
	}),

	bullet: ({ x, y, z }) => ({
		loop: true,
		from: {
			position: [x, y, z],
			rotation: [bulletXRotation, 0, 0],
		},
		color: 'red',
		rotation: [bulletXRotation, bulletYRotation, 0],
		position: [x, y, z],
		config: config.wobbly,
	}),

	object: () => ({

	}),

	healthBar: ({ health }) => ({
		loop: true,
		color: GameService.healthColor(health),
		config: config.wobbly,
	}),
};

export default animation;

import { config } from '@react-spring/three';

const xRotation = 180;
const yRotation = 360;
const flightYRotation = 3.1;
const flightXRotation = 1.5;

const animation = {
	target: ({ x, y }) => ({
		loop: true,
		from: {
			position: [x, y, 0],
		},
		color: 'green',
		rotation: [xRotation, yRotation, 0],
		position: [x, y, 0],
		config: config.wobbly,
	}),

	flight: ({ x, y }) => ({
		loop: true,
		from: {
			position: [x, y, 0],
		},
		color: 'royalBlue',
		rotation: [flightXRotation, flightYRotation, 0],
		position: [x, y, 0],
		config: config.wobbly,
	}),

	bullet: ({ x, y }) => ({
		loop: true,
		from: {
			position: [x, y, 0],
			rotation: [0, 0, 0],
		},
		color: 'red',
		rotation: [0, yRotation, 0],
		position: [x, y, 0],
		config: config.wobbly,
	}),

	object: () => ({

	}),
};

export default animation;

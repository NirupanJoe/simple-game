import { config } from '@react-spring/three';

const bulletXRotation = 30;
const bulletYRotation = 360;
const flightYRotation = 3.1;
const flightXRotation = 0;
const targetXRotation = 0;
// const power = 10;
// const radix = 16;
// const end = 8;

const animation = {
	target: ({ x, y, z }) => ({
		loop: true,
		from: {
			position: [x, y, z],
		},
		rotation: [targetXRotation, 0, 0],
		config: config.wobbly,
	}),

	flight: ({ x, y, z }) => ({
		loop: true,
		from: {
			position: [x, y, z],
		},
		color: 'royalBlue',
		rotation: [flightXRotation, flightYRotation, 0],
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

};

export default animation;

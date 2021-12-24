import { config } from '@react-spring/three';

const xRotation = 180;
const yRotation = 360;

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
};

export default animation;

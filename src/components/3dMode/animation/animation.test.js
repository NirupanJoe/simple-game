import { config } from '@react-spring/three';
import { rndBetween } from '@laufire/utils/random';
import animation from './animation';

describe('animation', () => {
	const {
		target,
	} = animation;
	const x = rndBetween();
	const y = rndBetween();
	const yRotation = 360;
	const xRotation = 180;

	test('target', () => {
		const result = target({ x, y });
		const expected = {
			loop: true,
			from: {
				position: [x, y, 0],
			},
			color: 'green',
			rotation: [xRotation, yRotation, 0],
			position: [x, y, 0],
			config: config.wobbly,
		};

		expect(result).toMatchObject(expected);
	});
});

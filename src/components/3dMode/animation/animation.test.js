import { config } from '@react-spring/three';
import { rndBetween, rndString } from '@laufire/utils/random';
import animation from './animation';
import * as helper from '../../../services/helperService';

describe('animation', () => {
	const {
		target,
		flight,
		bullet,
		object,
		healthBar,
	} = animation;
	const x = rndBetween();
	const y = rndBetween();
	const z = rndBetween();

	test('target', () => {
		const targetXRotation = 4.5;
		const targetZRotation = 4.7;
		const color = Symbol('color');
		const getChangedColor = rndString();

		jest.spyOn(helper, 'changeColor').mockReturnValue(getChangedColor);

		const result = target({ x, y, z, color });
		const expected = {
			loop: true,
			from: {
				position: [x, y, z],
			},
			color: `#${ getChangedColor }`,
			rotation: [targetXRotation, 0, targetZRotation],
			config: config.wobbly,
		};

		expect(result).toMatchObject(expected);
	});

	test('flight', () => {
		const flightYRotation = 3.1;

		const result = flight({ x, y, z });

		const expected = {
			loop: true,
			from: {
				position: [x, y, z],
			},
			rotation: [0, flightYRotation, 0],
			position: [x, y, z],
			config: config.wobbly,
		};

		expect(result).toMatchObject(expected);
	});

	test('bullet', () => {
		const bulletXRotation = 30;
		const bulletYRotation = 360;

		const result = bullet({ x, y, z });

		const expected = {
			loop: true,
			from: {
				position: [x, y, z],
				rotation: [bulletXRotation, 0, 0],
			},
			color: 'red',
			rotation: [bulletXRotation, bulletYRotation, 0],
			position: [x, y, z],
			config: config.wobbly,
		};

		expect(result).toMatchObject(expected);
	});

	test('object', () => {
		const result = object();

		expect(result).toMatchObject({});
	});

	test('healthBar', () => {
		const result = healthBar();

		expect(result).toMatchObject({});
	});
});

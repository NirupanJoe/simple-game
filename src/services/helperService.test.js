
/* eslint-disable max-lines-per-function */

import config from '../core/config';
import * as random from '@laufire/utils/random';
import * as helper from './helperService';
import { range } from '@laufire/utils/collection';
import * as THREE from 'three';

describe('HelperService', () => {
	const {
		getId,
		getVariance,
		degreeToRad,
	} = helper;
	const hundred = 100;
	const one = 1;
	const ten = 10;
	const twenty = 20;

	describe('getId', () => {
		test('getId gives a rndString of the configured idLength', () => {
			const returnValue = Symbol('mock');

			jest.spyOn(random, 'rndString')
				.mockReturnValue(returnValue);

			const result = getId(config);

			expect(random.rndString).toHaveBeenCalledWith(config.idLength);
			expect(result).toEqual(returnValue);
		});
	});

	describe('getVariance', () => {
		const returnValue = random.rndBetween(1, hundred);
		const variance = random.rndBetween(0, ten) / ten;
		const minimum = hundred - (variance * hundred);
		const maximum = hundred + (variance * hundred);

		test('returns a random number between variance range', () => {
			jest.spyOn(random, 'rndBetween')
				.mockReturnValue(returnValue);
			const { rndBetween } = random;
			const result = getVariance(variance);

			expect(rndBetween).toHaveBeenCalledWith(minimum, maximum);
			expect(result).toEqual(returnValue / hundred);
		});
	});

	test('isProbable true based on give probability', () => {
		jest.spyOn(random, 'rndBetween').mockReturnValue(twenty);

		const probability = 0.2;
		const { rndBetween } = random;
		const result = helper.isProbable(probability);

		expect(rndBetween).toHaveBeenCalledWith(1, hundred);
		expect(result).toBeTruthy();
	});

	test('isProbable true based on give probability', () => {
		jest.spyOn(random, 'rndBetween').mockReturnValue(hundred);

		const probability = 0.2;
		const { rndBetween } = random;
		const result = helper.isProbable(probability);

		expect(rndBetween).toHaveBeenCalledWith(1, hundred);
		expect(result).toBeFalsy();
	});

	test('flattenBullets', () => {
		const hits = range(0, random.rndBetween(one, ten)).map(() => ({
			targets: Symbol('targetValue'),
			bullets: range(0, random.rndBetween(one, ten))
				.map((data) => ({ id: data, isHit: false })),
		}));

		const expectation = hits.map(({ bullets }) => bullets).flat();

		const result = helper.flattenBullets(hits);

		expect(result).toMatchObject(expectation);
	});

	test('degreeToRad', () => {
		const getDegToRad = Symbol('getDegToRad');
		const deg = Symbol('deg');

		const backup = THREE.Math;

		// eslint-disable-next-line no-import-assign
		THREE.Math = {
			degToRad: jest.fn().mockReturnValue(getDegToRad),
		};

		const result = degreeToRad(deg);

		expect(result).toEqual(getDegToRad);
		expect(THREE.Math.degToRad).toHaveBeenCalledWith(deg);
		// eslint-disable-next-line no-import-assign
		THREE.Math = backup;
	});
});

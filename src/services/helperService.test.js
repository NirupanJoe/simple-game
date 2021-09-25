
/* eslint-disable max-lines-per-function */

import config from '../core/config';
import * as random from '@laufire/utils/random';
import * as helper from './helperService';

describe('HelperService', () => {
	const { getId, getVariance } = helper;
	const hundred = 100;
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
});

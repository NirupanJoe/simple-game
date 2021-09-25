/* eslint-disable max-lines-per-function */

import * as random from '@laufire/utils/random';
import positionService from './positionService';

describe('PositionService', () => {
	const { project, getRandomValue } = positionService;
	const twentyFive = 25;
	const hundred = 100;
	const two = 2;
	const range = random.rndBetween(twentyFive, hundred);

	test('project returns value greater than or equal to 0', () => {
		let i = 0;
		const maxLoop = 1001;

		for(i = 0; i < maxLoop; i++) {
			const data = Math.floor(Math.random() * maxLoop);
			const result = project(data);

			expect(result).toBeGreaterThanOrEqual(0);
		}
	});

	test('get random value for height and width',
		() => {
			const data = range;
			const min = range / two;
			const max = hundred - min;
			const returnValue = Symbol('returnValue');

			jest.spyOn(random, 'rndBetween').mockReturnValue(returnValue);

			const result = getRandomValue(data);

			expect(random.rndBetween).toHaveBeenCalledWith(min, max);
			expect(result).toEqual(returnValue);
		});
});

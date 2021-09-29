/* eslint-disable max-lines-per-function */

import * as random from '@laufire/utils/random';
import positionService from './positionService';
import config from '../core/config';

describe('PositionService', () => {
	const { project, getRandomValue } = positionService;
	const twentyFive = 25;
	const hundred = 100;
	const two = 2;
	const range = random.rndBetween(twentyFive, hundred);
	const returnValue = Symbol('returnValue');

	test('project returns value greater than or equal to 0', () => {
		jest.spyOn(Math, 'max').mockReturnValue(returnValue);
		jest.spyOn(Math, 'min').mockReturnValue(returnValue);
		const data = {
			view: {
				innerWidth: 1200,
			},
			clientX: 1300,
		};

		const result = project(data);

		expect(Math.max)
			.toHaveBeenCalledWith(data.clientX - (config.width / two), 0);
		expect(Math.min)
			.toHaveBeenCalledWith(data.view.innerWidth - config.width,
				returnValue);
		expect(result).toEqual(returnValue);
	});

	test('get random value for height and width',
		() => {
			const data = range;
			const min = range / two;
			const max = hundred - min;

			jest.spyOn(random, 'rndBetween').mockReturnValue(returnValue);

			const result = getRandomValue(data);

			expect(random.rndBetween).toHaveBeenCalledWith(min, max);
			expect(result).toEqual(returnValue);
		});
});

/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import * as random from '@laufire/utils/random';
import positionService from './positionService';

describe('PositionService', () => {
	const { project,
		pxToPercentage,
		getRandomValue } = positionService;
	const twentyFive = 25;
	const hundred = 100;
	const two = 2;
	const xPos = 80;
	const width = 6;
	const innerWidth = 1000;
	const thousand = 1000;
	const range = random.rndBetween(twentyFive, hundred);
	const returnValue = Symbol('returnValue');

	test('project returns value greater than or equal to 0', () => {
		jest.spyOn(Math, 'max').mockReturnValue(returnValue);
		jest.spyOn(Math, 'min').mockReturnValue(returnValue);

		const result = project(xPos, width);

		expect(Math.max)
			.toHaveBeenCalledWith(xPos - (width / two), 0);
		expect(Math.min)
			.toHaveBeenCalledWith(hundred - width, returnValue);
		expect(result).toEqual(returnValue);
	});

	test('returns value converted from px to percentage', () => {
		for(let i = 0; i <= thousand; i++) {
			const x = Math.floor(Math.random() * innerWidth);
			const result = pxToPercentage(x, innerWidth);

			expect(result).toBeLessThanOrEqual(hundred);
		}
	});

	test('get random value for height and width', () => {
		const data = range;
		const min = range / two;
		const max = hundred - min;

		jest.spyOn(random, 'rndBetween').mockReturnValue(returnValue);

		const result = getRandomValue(data);

		expect(random.rndBetween).toHaveBeenCalledWith(min, max);
		expect(result).toEqual(returnValue);
	});
});

import * as random from '@laufire/utils/random';
import positionService from './positionService';

describe('PositionService', () => {
	const {
		project,
		limitMovement,
		pxToPercentage,
		getRandomValue,
		isPointInRect,
		getAllPoints,
		threeDProject,
	} = positionService;
	const twentyFive = 25;
	const hundred = 100;
	const two = 2;
	const innerWidth = 1000;
	const thousand = 1000;
	const returnValue = Symbol('returnValue');
	const x = random.rndBetween(twentyFive, hundred);
	const y = random.rndBetween(twentyFive, hundred);
	const width = random.rndBetween(twentyFive, hundred);
	const height = random.rndBetween(twentyFive, hundred);

	test('project', () => {
		const data = {
			x,
			y,
			width,
			height,
		};
		const result = project(data);
		const expected = {
			x: result.x + (width / two),
			y: result.y + (height / two),
		};

		expect(data).toMatchObject(expected);
	});

	test('limitMovement returns value greater than or equal to 0', () => {
		jest.spyOn(Math, 'max').mockReturnValue(returnValue);
		jest.spyOn(Math, 'min').mockReturnValue(returnValue);

		const context = { state: { flight: { width }, position: { x }}};

		const result = limitMovement(context);

		expect(Math.max)
			.toHaveBeenCalledWith(context.state.position.x,
				context.state.flight.width / two);
		expect(Math.min)
			.toHaveBeenCalledWith(hundred - (width / two), returnValue);
		expect(result).toEqual(returnValue);
	});

	test('returns value converted from px to percentage', () => {
		for(let i = 0; i <= thousand; i++) {
			const xpx = Math.floor(Math.random() * innerWidth);
			const result = pxToPercentage(xpx, innerWidth);

			expect(result).toBeLessThanOrEqual(hundred);
		}
	});

	test('get random value for height and width', () => {
		const data = random.rndBetween(twentyFive, hundred);
		const min = data / two;
		const max = hundred - min;

		jest.spyOn(random, 'rndBetween').mockReturnValue(returnValue);

		const result = getRandomValue(data);

		expect(random.rndBetween).toHaveBeenCalledWith(min, max);
		expect(result).toEqual(returnValue);
	});

	describe('isPointInRect', () => {
		const bulletPoints = [
			{ x: 52, y: 63 },
			{ x: 111, y: 125 },
			{ x: 110, y: 125 },
		];

		const targetsValue = {
			topLeft: { x: 10, y: 15 },
			bottomRight: { x: 110, y: 125 },
		};

		const expectations = [
			[bulletPoints[0], true],
			[bulletPoints[1], false],
			[bulletPoints[2], true],
		];

		test.each(expectations)('isPointInRect %p',
			(bulletPoint, isHit) => {
				const result = isPointInRect(bulletPoint, targetsValue);

				expect(result).toEqual(isHit);
			});
	});
	test('getAllPoints', () => {
		const rect = { x, y, height };
		const expectation = {
			topLeft: {
				x: x - (width / two),
				y: y - (height / two),
			},
			bottomRight: {
				x: x + (width / two),
				y: y + (height / two),
			},
		};
		const result = getAllPoints({ ...rect, width });

		expect(result).toMatchObject(expectation);
	});
	test('ThreeDProject', () => {
		const rndViewport = random.rndBetween(1, twentyFive);
		const data = {
			x,
			y,
		};
		const viewport = {
			width: rndViewport,
			height: rndViewport,
		};
		const context = { data, viewport };
		const result = threeDProject(context);

		const expectation = {
			x: Math.round((result.x + (viewport.width / two))
			* (hundred / viewport.width)),
			y: Math.round((-result.y + (viewport.height / two))
			* (hundred / viewport.height)),
		};

		expect(data).toEqual(expectation);
	});
});

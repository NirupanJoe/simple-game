import { rndBetween } from '@laufire/utils/random';

const hundred = 100;
const two = 2;

const PositionService = {
	project: ({ x, y, width, height }) => ({
		x: x - (width / two),
		y: y - (height / two),
	}),

	limitMovement: ({ state: { flight: { width }, position: { x }}}) =>
		Math.min(hundred - (width / two), Math
			.max(x, 0 + (width / two))),

	pxToPercentage: (xPos, innerWidth) =>
		xPos / innerWidth * hundred,

	getRandomValue: (data) =>
		rndBetween(data / two, hundred - (data / two)),

	isPointInRect: ({ x, y }, { topLeft, bottomRight }) =>
		topLeft.x <= x && x <= bottomRight.x
		&& topLeft.y <= y && y <= bottomRight.y,

	getAllPoints: (rec) => ({
		topLeft: {
			x: rec.x - (rec.width / two),
			y: rec.y - (rec.height / two),
		},
		bottomRight: {
			x: rec.x + (rec.width / two),
			y: rec.y + (rec.height / two),
		},
	}),

	threeDProject: ({ config, data, viewport: { width, height }}) => ({
		...data,
		x: (data.x * width / hundred) - (width / two),
		y: config.threeDProjectY,
		z: (data.y * height / hundred) - (height / two),
	}),
};

export default PositionService;

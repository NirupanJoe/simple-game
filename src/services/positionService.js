import { rndBetween } from '@laufire/utils/random';

const hundred = 100;
const two = 2;

const PositionService = {
	project: (xPos, width) =>
		Math.min(hundred - width, Math
			.max(xPos - (width / two), 0)),

	pxToPercentage: (xPos, innerWidth) =>
		xPos / innerWidth * hundred,

	bulletPos: ({ state, config }) =>
		(state.flight.width / two)
		+ state.flight.x - (config.bullet.width / two),

	getRandomValue: (data) =>
		rndBetween(data / two, hundred - (data / two)),

};

export default PositionService;

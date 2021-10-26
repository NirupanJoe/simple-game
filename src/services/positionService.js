import { rndBetween } from '@laufire/utils/random';

const hundred = 100;
const two = 2;

const project = (x, width) =>
	Math.min(hundred - width, Math
		.max(x - (width / two), 0));

const pxToPercentage = (xPos, innerWidth) =>
	xPos / innerWidth * hundred;

const bulletPos = ({ state, config }) =>
	(state.flight.width / two) + state.flight.x - (config.bulletWidth / two);

const getRandomValue = (data) =>
	rndBetween(data / two, hundred - (data / two));

const PositionService = {
	project,
	bulletPos,
	getRandomValue,
	pxToPercentage,
};

export default PositionService;

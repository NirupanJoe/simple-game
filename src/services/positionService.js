import { rndBetween } from '@laufire/utils/random';

const hundred = 100;
const two = 2;

const project = (xPos, width) =>
	Math.min(hundred - width, Math
		.max(xPos - (width / two), 0));

const pxToPercentage = (xPos, innerWidth) =>
	xPos / innerWidth * hundred;

const getRandomValue = (data) =>
	rndBetween(data / two, hundred - (data / two));

const PositionService = {
	project,
	getRandomValue,
	pxToPercentage,
};

export default PositionService;

import { rndBetween } from '@laufire/utils/random';
import config from '../core/config';

const hundred = 100;
const two = 2;

const project = (xPos, width) =>
	Math.min(hundred - width, Math
		.max(xPos - (width / two), 0));

const pxToPercentage = (xPos, innerWidth) =>
	xPos / innerWidth * hundred;

const bulletProject = (width, xPos) =>
	(width / two) + xPos - (config.bulletWidth / two);

const getRandomValue = (data) =>
	rndBetween(data / two, hundred - (data / two));

const PositionService = {
	project,
	bulletProject,
	getRandomValue,
	pxToPercentage,
};

export default PositionService;

import config from '../core/config';
import { rndBetween } from '@laufire/utils/random';

const { width } = config;
const hundred = 100;
const two = 2;

const project = (data) =>
	Math.max(data - width, 0);

const getRandomValue = (data) =>
	rndBetween(data / two, hundred - (data / two));
const PositionService = {
	project,
	getRandomValue,
};

export default PositionService;

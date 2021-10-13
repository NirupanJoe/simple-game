import config from '../../core/config';
import { keys } from '@laufire/utils/collection';
import { rndValue, rndBetween } from '@laufire/utils/random';
import { getVariance, isProbable, getId } from '../helperService';
import positionService from '../positionService';

const { maxTargets } = config;
const targetTypeKeys = keys(config.targets);
const sixtyFive = 65;
const threeHundredFifty = 350;

const targetManager = {

	getTargets: ({ x, y, type } = {}) => {
		const typeConfig = config.targets[type || rndValue(targetTypeKeys)];
		const variance = getVariance(typeConfig.variance);
		const size = {
			height: typeConfig.height * variance,
			width: typeConfig.width * variance,
		};

		return {
			id: getId(config),
			x: x !== undefined ? x : positionService.getRandomValue(size.width),
			y: y !== undefined ? y : 0,
			filter: rndBetween(sixtyFive, threeHundredFifty),
			...typeConfig,
			...size,
		};
	},

	spawnTargets: () => targetTypeKeys.map((type) =>
		isProbable(config.targets[type].prop.spawn)
		&& targetManager.getTargets({ type })),

	addTargets: ({ state: { targets }}) =>
		(targets.length < maxTargets
			? [
				...targets,
				...targetManager.spawnTargets(),
			]
			:	targets),
};

export default targetManager;

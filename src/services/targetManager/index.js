import config from '../../core/config';
import { keys } from '@laufire/utils/collection';
import { rndValue, rndBetween } from '@laufire/utils/random';
import { getVariance, isProbable, getId } from '../helperService';
import positionService from '../positionService';
import { truthy } from '@laufire/utils/predicates';

// const { maxTargets } = config;
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
			color: rndBetween(sixtyFive, threeHundredFifty),
			...typeConfig,
			...size,
		};
	},

	spawnTargets: () => targetTypeKeys.map((type) =>
		isProbable(config.targets[type].prop.spawn)
		&& targetManager.getTargets({ type })).filter(truthy),

	addTargets: ({ state: { targets }}) =>
		[
			...targets,
			...targetManager.spawnTargets(),
		],

	moveTargets: ({ state: { targets }}) => targets.map((target) => ({
		...target,
		y: target.y + 1,
	})),

	removeTargets: ({ state: { targets }}) =>
		// eslint-disable-next-line no-magic-numbers
		targets.filter((target) => target.y > 100),
};

export default targetManager;

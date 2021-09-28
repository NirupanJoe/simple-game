import config from '../../core/config';
import { keys } from '@laufire/utils/collection';
import { rndValue } from '@laufire/utils/random';
import { getVariance, isProbable, getId } from '../helperService';
import { getRandomValue } from '../positionService';

const { maxTargets } = config;
const targetTypeKeys = keys(config.targets);

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
			x: x !== undefined ? x : getRandomValue(size.width),
			y: y !== undefined ? y : 0,
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

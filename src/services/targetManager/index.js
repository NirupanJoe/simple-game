import config from '../../core/config';
import { keys } from '@laufire/utils/collection';
import { rndValue, rndBetween } from '@laufire/utils/random';
import { getVariance, isProbable, getId } from '../helperService';
import positionService from '../positionService';
import { truthy } from '@laufire/utils/predicates';
import GameService from '../gameService';

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
			color: rndBetween(sixtyFive, threeHundredFifty),
			...typeConfig,
			...size,
		};
	},

	spawnTargets: () => targetTypeKeys.map((type) =>
		isProbable(config.targets[type].prop.spawn)
		&& targetManager.getTargets({ type })).filter(truthy),

	addTargets: ({ state: { targets }}) =>
		(targets.length < maxTargets
			? [
				...targets,
				...targetManager.spawnTargets(),
			]
			:	targets),

	generateenemyBullet: (context) => {
		const target = rndValue(context.state.targets);

		return isProbable(target.prop.bulletSpawn) && {
			...GameService.makeBullet({
				...context,
				data: GameService.getType(context),
			}),
			x: target.x,
			y: 10,
			rotate: 180,
		};
	},

	generateEnemyBullets: (context) => {
		const { state: { enemyBullets }} = context;
		const enemyBullet = targetManager.generateenemyBullet(context);

		return enemyBullet
			? enemyBullets.concat(enemyBullet)
			: enemyBullets;
	},
};

export default targetManager;

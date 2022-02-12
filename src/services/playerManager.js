import PositionService from './positionService';
import { find, map } from '@laufire/utils/collection';
import * as helper from './helperService';
import { rndString } from '@laufire/utils/random';
import * as helperService from '../services/helperService';

const hundred = 100;

const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,

	decreaseHealth: ({ state, config }) =>
		({ health: state.health - config.damage }),

	backGroundMovingAxis: ({ state, config }) =>
		({ bgnScreenY:
			(state.bgnScreenY + config.bgnScreenYIncre) % hundred }),

	updateObjects: ({ state, config }) => state.objects.map((obj) => ({ ...obj,
		y: obj.y + config.bgnScreenYIncre })),

	resetObjects: ({ state }) =>
		state.objects.filter((obj) => obj.y < hundred),

	moveBullets: ({ state, config }) =>
		state.bullets.map((bullet) => ({
			...bullet,
			y: bullet.y - config.moveBulletPercentage,
		})),

	detectBulletHit: ({ state: { targets, bullets }}) =>
		bullets.map((bullet) => ({
			...bullet,
			isHit: PlayerManager.isBulletHit(targets, bullet),
		})),
	generateObjects: (context) =>
		map(context.config.objects, (object) =>
			(helperService.isProbable(object.prob)
				? PlayerManager.createObjects({ ...context, data: object })
				: context.state.objects)),

	createObjects: ({ config, state, data: object }) => [
		...state.objects, {
			x: PositionService.getRandomValue(object.width),
			y: -PositionService.getRandomValue(object.height),
			id: rndString(config.rndLength),
			height: object.height,
			width: object.width,
			type: object.type,
		},
	],
	// const getMax = (a, b) => Math.max(a, b);
	// callback is invoked for each element in the array starting at index 0
	// [1, 100].reduce(getMax, 50); // 100
	// const generateObjects: (context) => {cloud:[{},{},{}], ship:[{}, {}, {}]}
	// const createObjects: (config, state, data: object) = []

	removeHitBullets: ({ state: { bullets }}) =>
		bullets.filter((data) => data.isHit !== true),

	detectOverLapping: (bullet, target) =>
		find(bullet, (value) =>
			PositionService.isPointInRect(value, target)),

	isBulletHit: (bullet, target) =>
		PlayerManager
			.detectOverLapping(PositionService.getAllPoints(bullet),
				PositionService.getAllPoints(target)) !== undefined,

	filterBullet: (bullets, target) => bullets.filter((bullet) =>
		PlayerManager.isBulletHit(bullet, target)),

	collectHits: ({ state: { targets, bullets }}) =>
		targets.map((target) =>
			({
				target: { ...target },
				bullets: PlayerManager.filterBullet(bullets, target),
			})),

	updateHealth: (hits) => hits.map(({ target, bullets }) =>
		({		...target,
			health: PlayerManager.calDamage(target, bullets) })),

	updateBulletIsHit: (hitBullets, { state: { bullets }}) => {
		const bulletsId = hitBullets.map((bullet) => bullet.id);

		return bullets.map((bullet) => (
			{ ...bullet, isHit: bulletsId.includes(bullet.id) }));
	},

	processHits: (context) => {
		const hits = PlayerManager.collectHits(context);

		return	{
			targets: PlayerManager.updateHealth(hits),
			bullets: PlayerManager
				.updateBulletIsHit(helper.flattenBullets(hits), context),
		};
	},
	calDamage: (target, bullets) => Math.max(target.health - bullets
		.reduce((a, c) => a + c.damage, 0), 0),

	updateScore: ({ state: { targets, score }}) =>
		targets.reduce((a, target) =>
			(target.health === 0 ? a + 1 : a), score),

	removeTargets: ({ state: { targets }}) =>
		targets.filter((target) => target.health !== 0),

};

export default PlayerManager;

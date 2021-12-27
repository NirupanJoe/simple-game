import PositionService from './positionService';
import { find } from '@laufire/utils/collection';
import * as helper from './helperService';

const hundred = 100;
const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,

	decreaseHealth: ({ state, config }) =>
		({ health: state.health - config.damage }),

	backGroundMovingAxis: ({ state, config }) =>
		({ bgnScreenY:
			(state.bgnScreenY + config.bgnScreenYIncre) % hundred }),

	updateCloudPosition: ({ state, config }) => state.objects.map((obj) => ({
		...obj,
		y: obj.y + config.bgnScreenYIncre,
	})),

	resetCloudPosition: ({ state }) =>
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

	removeTargets: ({ state: { targets }}) =>
		targets.filter((target) => target.health !== 0),

};

export default PlayerManager;

import { rndString } from '@laufire/utils/random';
import * as HelperService from './helperService';
import { keys } from '@laufire/utils/collection';

const low = 20;
const mid = 50;

const GameService = {

	healthColor: (health) =>
		(health <= low
			? 'red'
			: health <= mid
				? 'yellow'
				: 'greenYellow'),

	makeBullet: ({ state: { flight: { x }}, config, data }) =>
		({ ...data,
			id: rndString(config.rndLength),
			x: x,
			y: config.bulletYAxis,
			isHit: false }),

	getType: ({ config: { bulletsType, defaultBulletType }}) => {
		const bulletTypeKeys = keys(bulletsType);

		const type = bulletTypeKeys.find((key) =>
			HelperService.isProbable(bulletsType[key].prob));

		return type !== undefined
			? bulletsType[type]
			: bulletsType[defaultBulletType];
	},

	generateBullets: (context) => {
		const { state: { bullets }} = context;

		return bullets.concat(GameService
			.makeBullet({ ...context,
				data: GameService.getType(context) }));
	},

	ceilHealth: (health) =>
		Math.ceil(health),
};

export default GameService;

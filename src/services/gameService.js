import { rndString } from '@laufire/utils/random';

const low = 20;
const mid = 50;

const healthColor = (health) =>
	(health <= low
		? 'red'
		: health <= mid
			? 'yellow'
			: 'greenYellow');

const makeBullet = (xPos, config) => ({
	id: rndString(config.rndLength),
	type: 'normal',
	x: xPos,
	y: 90,
	height: config.bullet.height,
	width: config.bullet.width,
	isHit: false,
});

const generateBullets = ({ state, config }, xPos) =>
	state.bullets.concat(makeBullet(xPos, config));

const ceilHealth = (health) =>
	Math.ceil(health);

const GameService = {
	healthColor,
	generateBullets,
	ceilHealth,
};

export default GameService;

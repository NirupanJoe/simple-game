import { rndString } from '@laufire/utils/random';

const low = 20;
const mid = 50;

const healthColor = (health) =>
	(health <= low
		? 'red'
		: health <= mid
			? 'yellow'
			: 'greenYellow');

const makeBullet = (xPos, { rndLength, bullet }) => ({
	id: rndString(rndLength),
	type: 'normal',
	x: xPos,
	y: 90,
	height: bullet.normal.height,
	width: bullet.normal.width,
	image: bullet.normal.image,
	isHit: false,
});

const generateBullets = ({ state: { bullets, flight }, config }) =>
	bullets.concat(makeBullet(flight.x, config));

const ceilHealth = (health) =>
	Math.ceil(health);

const GameService = {
	healthColor,
	generateBullets,
	ceilHealth,
};

export default GameService;

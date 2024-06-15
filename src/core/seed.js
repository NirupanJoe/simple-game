import config from './config';
import bulletImage from '../images/bullet.png';

const seed = {
	position: {
		x: 0,
		y: 0,
	},
	health: config.health,
	score: 0,
	bgnScreenY: 10,
	ready: false,
	audio: false,
	help: false,
	playPause: false,
	flight: config.flight,
	targets: [],
	objects: [],
	bullets: [],
	enemyBullets: [{
		image: bulletImage,
		type: 'normal',
		height: 2,
		width: 1,
		color: 0,
		prob: 0.6,
		damage: 1,
		id: 'dfsd12',
		x: 50,
		y: 50,
		isHit: false,
	}],

};

export default seed;

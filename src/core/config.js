import fighterJet from '../images/fighterJet.png';
import bulletImage from '../images/bullet.png';

const config = {
	tickerDelay: 100,
	health: 100,
	damage: 0.1,
	rndLength: 16,
	defaultMode: '3d',
	flight: {
		x: 50,
		y: 90,
		width: 6,
	},
	bulletsType: {
		normal: {
			type: 'normal',
			height: 2,
			width: 1,
			image: bulletImage,
			color: 0,
			prob: 0.6,
			damage: 1,
		},
		superBullet: {
			type: 'superBullet',
			height: 4,
			width: 1,
			image: bulletImage,
			color: 330,
			prob: 0.3,
			damage: 2,
		},
	},
	defaultBulletType: 'normal',
	bulletYAxis: 90,
	moveBulletPercentage: 5,
	bgnScreenYIncre: 1,
	maxTargets: 5,
	targets: {
		shooter: {
			health: 1,
			damage: 1,
			type: 'shooter',
			image: fighterJet,
			height: 6,
			width: 6,
			y: 10,
			variance: 0.2,
			prop: {
				spawn: 1,
			},
		},
	},
};

export default config;

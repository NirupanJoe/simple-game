import fighterJet from '../images/fighterJet.png';
import bulletImage from '../images/bullet.png';
import cloudImage from '../images/cloud.png';
import shipImage from '../images/ship.png';

const config = {
	tickerDelay: 100,
	health: 100,
	damage: 0.1,
	rndLength: 16,
	threeDProjectY: 3,
	defaultMode: '2d',
	healthPosition: {
		x: 5,
		y: 2.5,
		width: 10,
		height: 5,
	},
	scorePosition: {
		x: 95,
		y: 3,
	},
	audioControl: {
		x: 50,
		y: 3,
		width: 3,
		height: 4,
	},
	playPause: {
		x: 60,
		y: 3,
	},
	flight: {
		x: 50,
		y: 90,
		width: 6,
	},
	shortcutKeys: [
		{ key: 'M', action: 'mute', desc: 'Mute' },
		{ key: 'ENTER', action: 'gameStart', desc: 'StartGame' },
		{ key: 'H', action: 'help', desc: 'Help' },
		{ key: 'P', action: 'playPause', desc: 'Play/Pause' },
	],
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
	objects: {
		cloud: {
			width: 20,
			height: 10,
			type: 'cloud',
			prob: 0.02,
			image: cloudImage,
		},
		ship: {
			width: 5,
			height: 10,
			type: 'ship',
			prob: 0.01,
			image: shipImage,
		},
	},

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
				spawn: 0.01,
			},
		},
	},
};

export default config;

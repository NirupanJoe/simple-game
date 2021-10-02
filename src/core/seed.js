import config from './config';

const seed = {
	health: config.health,
	score: 0,
	bgnScreenY: 0,
	flight: {
		x: 0,
		width: 6,
	},
	targets: [],
};

export default seed;

import config from './config';

const seed = {
	health: config.health,
	score: 0,
	bgnScreenY: 10,
	flight: {
		x: 0,
		width: 6,
	},
	targets: [],
	objects: [{
		x: 20,
		y: -20,
		type: 'Cloud',
		id: 'vvv',
	},
	{
		x: 50,
		y: -20,
		type: 'Cloud',
		id: 'aa',
	}],
	bullets: [],
};

export default seed;

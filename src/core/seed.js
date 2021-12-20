import config from './config';

const seed = {
	position: {
		x: 0,
		y: 0,
	},
	health: config.health,
	score: 0,
	bgnScreenY: 10,
	flight: config.flight,
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

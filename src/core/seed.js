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
	targets: [
		{
			id: 'ZPYPMGFQ',
			color: 'red',
			damage: 1,
			health: 1,
			height: 5.28,
			image: '/react-starter/static/media/fighterJet.65ded3a9.png',
			prop: { spawn: 1 },
			type: 'shooter',
			variance: 0.2,
			width: 5.28,
			x: 82.64,
			y: 10,
		},
		{
			id: 'AYEJZGQL',
			color: 'green',
			damage: 1,
			health: 1,
			height: 6.84,
			image: '/react-starter/static/media/fighterJet.65ded3a9.png',
			prop: { spawn: 1 },
			type: 'shooter',
			variance: 0.2,
			width: 6.84,
			x: 19.42,
			y: 10,
		},
	],
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

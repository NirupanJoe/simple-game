import fighterJet from '../images/fighterJet.png';

const config = {
	tickerDelay: 1000,
	health: 100,
	damage: 1,
	rndLength: 16,
	bulletWidth: 2,
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
			variance: 0.2,
			prop: {
				spawn: 1,
			},
		},
	},
};

export default config;

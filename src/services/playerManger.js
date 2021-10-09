const hundred = 100;
const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,

	decreaseHealth: ({ state, config }) =>
		({ health: state.health - config.damage }),

	backGroundMovingAxis: ({ state, config }) =>
		({ bgnScreenY:
			(state.bgnScreenY + config.bgnScreenYIncre) % hundred }),

	updateCloudPosition: ({ state, config }) => state.objects.map((obj) => ({
		...obj,
		y: obj.y + config.bgnScreenYIncre,
	})),

	resetCloudPosition: ({ state }) =>
		state.objects.filter((obj) => obj.y < hundred),
};

export default PlayerManager;

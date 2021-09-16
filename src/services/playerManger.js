
const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,

	decreaseHealth: ({ state, config }) =>
		({ health: state.health - config.damage }),
};

export default PlayerManager;

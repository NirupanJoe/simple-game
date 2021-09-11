const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,
};

export default PlayerManager;

const hundred = 100;
const PlayerManager = {
	isAlive: ({ state }) => state.health > 0,

	decreaseHealth: ({ state, config }) =>
		({ health: Math.ceil(state.health - config.damage) }),

	backGroundMovingAxis: ({ state, config }) =>
		({ bgnScreenY:
			(state.bgnScreenY + config.bgnScreenYIncre) % hundred }),

	updateCloudPosition: ({ state, config }) => state.objects.map((obj) => ({
		...obj,
		y: obj.y + config.bgnScreenYIncre,
	})),

	resetCloudPosition: ({ state }) =>
		state.objects.filter((obj) => obj.y < hundred),

	moveBullets: ({ state, config }) =>
		state.bullets.map((bullet) => ({
			...bullet,
			y: bullet.y - config.moveBulletPercentage,
		})),
};

export default PlayerManager;

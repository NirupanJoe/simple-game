
const low = 20;
const mid = 50;

const healthColor = (health) =>
	(health <= low
		? 'red'
		: health <= mid
			? 'yellow'
			: 'greenYellow');

const GameService = {
	healthColor,
};

export default GameService;

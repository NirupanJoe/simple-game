import GameService from '../services/gameService';
import PlayerManager from '../services/playerManager';
import PositionService from '../services/positionService';
import targetManager from '../services/targetManager';

const restart = ({ seed }) => seed;

const decreaseHealth = (context) => PlayerManager.decreaseHealth(context);

const addTargets = (context) => ({
	targets: targetManager.addTargets(context),
});

const backGroundMovingAxis = (context) =>
	PlayerManager.backGroundMovingAxis(context);

const updateMousePosition = ({ data }) => ({
	position: {
		x: PositionService.pxToPercentage(data.clientX, data.view.innerWidth),
		y: PositionService.pxToPercentage(data.clientY, data.view.innerHeight),
	},
});

const updateFlightPosition = (context) => ({
	flight: {
		x: PositionService.limitMovement(context),
	},
});

const updateObjects = (context) => ({
	objects: PlayerManager.updateObjects(context),
});

const resetObjects = (context) => ({
	objects: PlayerManager.resetObjects(context),
});

const generateBullets = (context) => ({
	bullets: GameService.generateBullets(context),
});

const moveBullets = (context) => ({
	bullets: PlayerManager.moveBullets(context),
});

const processBullets = (context) =>
	PlayerManager.processHits(context);

const clearHitBullets = (context) => ({
	bullets: PlayerManager.removeHitBullets(context),
});
const generateObjects = (context) => {
	// eslint-disable-next-line no-unused-vars
	const finalArr = Object.values(PlayerManager.generateObjects(context))
		.flat();

	return { } ;
};

const updateScore = (context) => ({
	score: PlayerManager.updateScore(context),
});

const removeTargets = (context) => ({
	targets: PlayerManager.removeTargets(context),
});

const actions = {
	updateMousePosition,
	restart,
	decreaseHealth,
	backGroundMovingAxis,
	addTargets,
	updateObjects,
	resetObjects,
	generateBullets,
	moveBullets,
	updateFlightPosition,
	processBullets,
	clearHitBullets,
	updateScore,
	removeTargets,
	generateObjects,
};

export default actions;

import GameService from '../services/gameService';
import PlayerManager from '../services/playerManger';
import PositionService from '../services/positionService';
import targetManager from '../services/targetManager';

const restart = ({ seed }) => ({ ...seed, ready: true });

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

const updateCloudPosition = (context) => ({
	objects: PlayerManager.updateCloudPosition(context),
});

const resetCloudPosition = (context) => ({
	objects: PlayerManager.resetCloudPosition(context),
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

const updateScore = (context) => ({
	score: PlayerManager.updateScore(context),
});

const removeTargets = (context) => ({
	targets: PlayerManager.removeTargets(context),
});

const gameStart = ({ data }) => ({
	ready: data,
});

const actions = {
	updateMousePosition,
	restart,
	decreaseHealth,
	backGroundMovingAxis,
	addTargets,
	updateCloudPosition,
	resetCloudPosition,
	generateBullets,
	moveBullets,
	updateFlightPosition,
	processBullets,
	clearHitBullets,
	updateScore,
	removeTargets,
	gameStart,
};

export default actions;

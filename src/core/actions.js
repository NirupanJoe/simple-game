import GameService from '../services/gameService';
import PlayerManager from '../services/playerManger';
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
		y: PositionService.pxToPercentage(data.clientY, data.view.innerWidth),
	},
});

const updateFlightPosition = ({ state }) => ({
	flight: {
		x: PositionService.project(state.position.x, state.flight.width),
	},
});

const updateCloudPosition = (context) => ({
	objects: PlayerManager.updateCloudPosition(context),
});

const resetCloudPosition = (context) => ({
	objects: PlayerManager.resetCloudPosition(context),
});

const generateBullets = (context) => ({
	bullets: GameService
		.generateBullets(context,
			PositionService.bulletPos(context)),
});

const processBullet = (context) => ({
	bullets: PlayerManager.detectBulletHit(context),
});

const moveBullets = (context) => ({
	bullets: PlayerManager.moveBullets(context),
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
	processBullet,
};

export default actions;

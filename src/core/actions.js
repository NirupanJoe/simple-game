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

const updateMousePosition = ({ state, data }) => ({
	flight: { x: PositionService
		.project(PositionService
			.pxToPercentage(data.clientX, data.view.innerWidth),
		state.flight.width) },
});

const updateCloudPosition = (context) => ({
	objects: PlayerManager.updateCloudPosition(context),
});

const resetCloudPosition = (context) => ({
	objects: PlayerManager.resetCloudPosition(context),
});

const actions = {
	updateMousePosition,
	restart,
	decreaseHealth,
	backGroundMovingAxis,
	addTargets,
	updateCloudPosition,
	resetCloudPosition,
};

export default actions;

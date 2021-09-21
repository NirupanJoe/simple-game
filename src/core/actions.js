import PlayerManager from '../services/playerManger';
import PositionService from '../services/positionService';

const restart = ({ seed }) => seed;

const decreaseHealth = (context) => PlayerManager.decreaseHealth(context);

const backGroundMovingAxis = (context) =>
	PlayerManager.backGroundMovingAxis(context);

const updateMousePosition = ({ data }) => ({
	flight: { x: PositionService.project(data) },
});

const actions = {
	updateMousePosition,
	restart,
	decreaseHealth,
	backGroundMovingAxis,
};

export default actions;

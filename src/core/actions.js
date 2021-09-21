import PlayerManager from '../services/playerManger';

const restart = ({ seed }) => seed;

const decreaseHealth = (context) => PlayerManager.decreaseHealth(context);

const backGroundMovingAxis = (context) =>
	PlayerManager.backGroundMovingAxis(context);

const actions = {
	restart,
	decreaseHealth,
	backGroundMovingAxis,
};

export default actions;

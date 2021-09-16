import PlayerManager from '../services/playerManger';

const restart = ({ seed }) => seed;

const decreaseHealth = (context) => PlayerManager.decreaseHealth(context);

const actions = {
	restart,
	decreaseHealth,
};

export default actions;

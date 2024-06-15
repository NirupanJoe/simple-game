import context from '../../core/context';

const masterLoop = [
	'decreaseHealth',
	'backGroundMovingAxis',
	'addTargets',
	'generateObjects',
	'updateObjects',
	'resetObjects',
	'moveBullets',
	'processBullets',
	'clearHitBullets',
	'updateScore',
	'removeTargets',
	'processEnemyBullets',
	'generateTargetsBullets',
	'moveTargetsBullets',
];

const runMasterLoop = () =>
	!context.state.playPause
			&& masterLoop.forEach((data) => context.actions[data]());

const master = {
	runMasterLoop,
	masterLoop,
};

export default master;

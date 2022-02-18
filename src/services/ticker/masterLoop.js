import context from '../../core/context';

const masterLoop = [
	'decreaseHealth',
	'backGroundMovingAxis',
	'addTargets',
	'generateClouds',
	'updateCloudPosition',
	'resetCloudPosition',
	'moveBullets',
	'processBullets',
	'clearHitBullets',
	'updateScore',
	'removeTargets',
	'processEnemyBullets',
];

const runMasterLoop = () =>
	masterLoop.forEach((data) => context.actions[data]());

const master = {
	runMasterLoop,
	masterLoop,
};

export default master;

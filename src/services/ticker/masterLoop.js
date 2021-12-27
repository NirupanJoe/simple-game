import context from '../../core/context';

const masterLoop = [
	'decreaseHealth',
	'backGroundMovingAxis',
	'addTargets',
	'updateCloudPosition',
	'resetCloudPosition',
	'moveBullets',
	'processBullets',
	'clearHitBullets',
	'removeTargets',
];

const runMasterLoop = () =>
	masterLoop.forEach((data) => context.actions[data]());

const master = {
	runMasterLoop,
	masterLoop,
};

export default master;

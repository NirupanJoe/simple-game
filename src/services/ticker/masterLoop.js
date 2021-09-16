import context from '../../core/context';

const masterLoop = [
	'decreaseHealth',
];

const runMasterLoop = () =>
	masterLoop.forEach((data) => context.actions[data]());

const master = {
	runMasterLoop,
	masterLoop,
};

export default master;

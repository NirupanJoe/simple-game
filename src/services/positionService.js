import config from '../core/config';

const { width } = config;
// const two = 2;

const project = (data) =>
	Math.max(data - width, 0);

const PositionService = {
	project,
};

export default PositionService;

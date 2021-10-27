import { rndBetween } from '@laufire/utils/random';
import { find } from '@laufire/utils/collection';

const hundred = 100;
const two = 2;

const PositionService = {
	project: (xPos, width) =>
		Math.min(hundred - width, Math
			.max(xPos - (width / two), 0)),

	pxToPercentage: (xPos, innerWidth) =>
		xPos / innerWidth * hundred,

	bulletPos: ({ state, config }) =>
		(state.flight.width / two)
		+ state.flight.x - (config.bullet.width / two),

	getRandomValue: (data) =>
		rndBetween(data / two, hundred - (data / two)),

	getTargetsPoints: (targets) =>
		targets.map(PositionService.getAllPoints),

	isBulletHit: (targets, bullet) =>
		PositionService.getTargetsPoints(targets)
			.find((target) => PositionService.detectOverLapping(target,
				PositionService.getAllPoints(bullet))) !== undefined,

	detectOverLapping: (target, bullet) =>
		find(target, (value) =>
			PositionService.isPointInRect(value, bullet)),

	isPointInRect: ({ x, y }, { topLeft, bottomRight }) =>
		topLeft.x <= x && x <= bottomRight.x
			&& topLeft.y >= y && y >= bottomRight.y,

	getAllPoints: (rec) => ({
		topLeft: {
			x: rec.x,
			y: rec.y,
		},
		topRight: {
			x: rec.x + rec.width,
			y: rec.y,
		},
		bottomLeft: {
			x: rec.x,
			y: rec.y + rec.height,
		},
		bottomRight: {
			x: rec.x + rec.width,
			y: rec.y + rec.height,
		},
	}),
};

export default PositionService;

import { rndBetween } from '@laufire/utils/random';
import { find } from '@laufire/utils/collection';

const hundred = 100;
const two = 2;

const PositionService = {
	project: ({ x, width }) =>
		x - (width / two),

	limitMovement: ({ state: { flight: { width }, position: { x }}}) =>
		Math.min(hundred - (width / two), Math
			.max(x, 0 + (width / two))),

	pxToPercentage: (xPos, innerWidth) =>
		xPos / innerWidth * hundred,

	getRandomValue: (data) =>
		rndBetween(data / two, hundred - (data / two)),

	getTargetsPoints: (targets) =>
		targets.map(PositionService.getAllPoints),

	isBulletHit: (targets, bullet) =>
		PositionService.getTargetsPoints(targets)
			.find((target) => PositionService.detectOverLapping(target,
				PositionService.getAllPoints(bullet))) !== undefined,

	detectOverLapping: (target, bullet) =>
		find(bullet, (value) =>
			PositionService.isPointInRect(value, target)),

	isPointInRect: ({ x, y }, { topLeft, bottomRight }) =>
		topLeft.x <= x && x <= bottomRight.x
		&& topLeft.y <= y && y <= bottomRight.y,

	getAllPoints: (rec) => ({
		topLeft: {
			x: rec.x - (rec.width / two),
			y: rec.y - (rec.height / two),
		},
		bottomRight: {
			x: rec.x + (rec.width / two),
			y: rec.y + (rec.height / two),
		},
	}),
};

export default PositionService;

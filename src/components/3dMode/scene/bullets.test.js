import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';
import PositionService from '../../../services/positionService';
import * as getSprings from '../animation';
import * as BulletModel from '../model/bullet';
import Bullet from './bullets';

test('Bullet', () => {
	const ten = 10;
	const ranges = range(0, rndBetween(1, ten));
	const state = {
		bullets: ranges.map(Symbol),
	};
	const context = {
		state,
	};
	const projected = Symbol('projected');
	const springs = state.bullets.map(() => Symbol('spring'));
	const enrichedBullets = state.bullets.map(() => projected);
	const bullet = Symbol('bullet');

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(projected);
	jest.spyOn(getSprings, 'default').mockReturnValue(springs);
	jest.spyOn(BulletModel, 'default').mockReturnValue(bullet);

	const result = Bullet(context);

	state.bullets.forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	expect(getSprings.default).toHaveBeenCalledWith(enrichedBullets, 'bullet');

	springs.forEach((animationData, i) =>
		expect(BulletModel.default).toHaveBeenCalledWith({
			...context, data: { ...enrichedBullets[i], ...animationData },
		}));
	const expected = state.bullets.map(() => bullet);

	expect(result).toEqual(expected);
});

import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';
import PositionService from '../../../services/positionService';
import * as getSprings from '../animation';
import * as TargetModel from '../model/target';
import Targets from './targets';

test('Target', () => {
	const ten = 10;
	const ranges = range(0, rndBetween(1, ten));
	const state = {
		targets: ranges.map(Symbol),
	};
	const context = {
		state,
	};
	const projected = Symbol('projected');
	const springs = state.targets.map(() => Symbol('spring'));
	const enrichedTargets = state.targets.map(() => projected);
	const target = Symbol('bullet');

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(projected);
	jest.spyOn(getSprings, 'default').mockReturnValue(springs);
	jest.spyOn(TargetModel, 'default').mockReturnValue(target);

	const result = Targets(context);

	state.targets.forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	expect(getSprings.default).toHaveBeenCalledWith(enrichedTargets, 'target');

	springs.forEach((animationData, i) =>
		expect(TargetModel.default).toHaveBeenCalledWith({
			...context, data: { ...enrichedTargets[i], ...animationData },
		}));
	const expected = state.targets.map(() => target);

	expect(result).toEqual(expected);
});

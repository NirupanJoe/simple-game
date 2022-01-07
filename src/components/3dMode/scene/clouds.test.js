import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';
import PositionService from '../../../services/positionService';
import * as getSprings from '../animation';
import * as CloudModel from '../model/cloud';
import Clouds from './clouds';

test('Clouds', () => {
	const ten = 10;
	const ranges = range(0, rndBetween(1, ten));
	const state = {
		objects: ranges.map(Symbol),
	};
	const context = {
		state,
	};
	const projected = Symbol('projected');
	const springs = state.objects.map(() => Symbol('spring'));
	const enrichedObjects = state.objects.map(() => projected);
	const object = Symbol('object');

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(projected);
	jest.spyOn(getSprings, 'default').mockReturnValue(springs);
	jest.spyOn(CloudModel, 'default').mockReturnValue(object);

	const result = Clouds(context);

	state.objects.forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	expect(getSprings.default).toHaveBeenCalledWith(enrichedObjects, 'object');

	springs.forEach((animationData, i) =>
		expect(CloudModel.default).toHaveBeenCalledWith({
			...context, data: { ...enrichedObjects[i], ...animationData },
		}));
	const expected = state.objects.map(() => object);

	expect(result).toEqual(expected);
});

/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */

import TargetManager from '.';
import config from '../../core/config';
import * as HelperService from '../helperService';
import PositionService from '../positionService';
import { keys, range } from '@laufire/utils/collection';
import * as random from '@laufire/utils/random';

describe('target Manager', () => {
	const x = Symbol('x');
	const y = 0;
	const id = Symbol('id');
	const { addTargets, getTargets } = TargetManager;

	describe(' add targets', () => {
		const targets = [Symbol('targets')];

		test(' return targets', () => {
			const spawnTargets = [Symbol('spawnTargets')];

			jest.spyOn(TargetManager, 'spawnTargets')
				.mockReturnValue(spawnTargets);

			const result = addTargets({ state: { targets }});
			const expectedResult = [
				...targets,
				...spawnTargets,
			];

			expect(TargetManager.spawnTargets).toHaveBeenCalledWith();
			expect(result).toEqual(expectedResult);
		});

		test('returns the targets without any new targets', () => {
			const maxTargets = range(0, config.maxTargets)
				.map(() => targets[0]);
			const result = addTargets({ state: { targets: maxTargets }});

			expect(result).toEqual(maxTargets);
		});
	});
	describe('spawnTargets', () => {
		const { spawnTargets } = TargetManager;
		const targetTypes = keys(config.targets);

		test('spawnTargets returns all target when isProb is true', () => {
			jest.spyOn(HelperService, 'isProbable')
				.mockReturnValue(true);

			const result = spawnTargets();
			const resultType = result.map((item) => item.type);

			targetTypes.map((type) =>
				expect(HelperService.isProbable)
					.toHaveBeenCalledWith(config.targets[type].prop.spawn));
			expect(resultType).toEqual(targetTypes);
		});

		test('spawnTargets returns no target when isProb is false', () => {
			jest.spyOn(HelperService, 'isProbable').mockReturnValue(false);

			const result = spawnTargets();

			targetTypes.map((type) =>
				expect(HelperService.isProbable)
					.toHaveBeenCalledWith(config.targets[type].prop.spawn));
			expect(result).toEqual([false]);
		});
	});

	describe('getTarget returns target', () => {
		const type = 'shooter';
		const typeConfig = config.targets[type];
		const { variance } = typeConfig;
		const { height, width } = typeConfig;
		const size = {
			height: height * variance,
			width: width * variance,
		};
		const sixtyFive = 65;
		const threeHundredFifty = 350;
		const color = Symbol('color');

		test('returns a target while params are passed', () => {
			jest.spyOn(HelperService, 'getId').mockReturnValue(id);
			jest.spyOn(HelperService, 'getVariance').mockReturnValue(variance);
			jest.spyOn(random, 'rndBetween').mockReturnValue(color);

			const expectedResult = {
				id,
				x,
				y,
				type,
				color,
				...typeConfig,
				...size,
			};

			const result = getTargets({ x, y, type });

			expect(HelperService.getId).toHaveBeenCalled();
			expect(HelperService.getVariance).toHaveBeenCalledWith(variance);
			expect(random.rndBetween)
				.toHaveBeenCalledWith(sixtyFive, threeHundredFifty);
			expect(result).toMatchObject(expectedResult);
		});

		test('getTarget params are optional', () => {
			jest.spyOn(HelperService, 'getId')
				.mockReturnValue(id);
			jest.spyOn(random, 'rndValue')
				.mockReturnValue('shooter');
			jest.spyOn(HelperService, 'getVariance')
				.mockReturnValue(variance);
			jest.spyOn(PositionService, 'getRandomValue')
				.mockReturnValue(x);

			const expectedResult = {
				id,
				x,
				y,
				type,
				...typeConfig,
				...size,
			};
			const result = getTargets();

			expect(HelperService.getId).toHaveBeenCalled();
			expect(HelperService.getVariance).toHaveBeenCalledWith(variance);
			expect(PositionService.getRandomValue)
				.toHaveBeenCalledWith(size.width);
			expect(result).toMatchObject(expectedResult);
		});
	});
});

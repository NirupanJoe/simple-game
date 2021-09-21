/* eslint-disable max-lines-per-function */
import Actions from '../core/actions';
import PlayerManager from '../services/playerManger';
import context from '../core/context';
import PositionService from '../services/positionService';

describe('actions', () => {
	const { restart, updateMousePosition } = Actions;
	const returnValue = Symbol('return');

	test('restart returns seed', () => {
		const seed = Symbol('seed');
		const result = restart({ seed });

		expect(result).toEqual(seed);
	});

	test('decrease Health', () => {
		jest.spyOn(PlayerManager, 'decreaseHealth')
			.mockReturnValue(returnValue);

		const result = Actions.decreaseHealth(context);

		expect(PlayerManager.decreaseHealth)
			.toHaveBeenCalledWith(context);
		expect(result).toEqual(returnValue);
	});

	test('Background Moving Axis check', () => {
		jest.spyOn(PlayerManager, 'backGroundMovingAxis')
			.mockReturnValue(returnValue);

		const result = Actions.backGroundMovingAxis(context);

		expect(PlayerManager.backGroundMovingAxis)
			.toHaveBeenCalledWith(context);
		expect(result).toEqual(returnValue);
	});

	test('updateMousePosition returns flight.x', () => {
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);
		const data = 100;
		const result = updateMousePosition({ data });
		const expected = { flight: { x: returnValue }};

		expect(result).toMatchObject(expected);
		expect(PositionService.project).toHaveBeenCalledWith(data);
	});
});

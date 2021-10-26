/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import actions from '../core/actions';
import PlayerManager from '../services/playerManger';
import context from '../core/context';
import PositionService from '../services/positionService';
import targetManager from '../services/targetManager';
import GameService from '../services/gameService';

describe('actions', () => {
	const { restart,
		updateMousePosition,
		addTargets,
		updateCloudPosition,
		resetCloudPosition,
		generateBullets,
		moveBullets,
		updateFlightPosition } = actions;

	const returnValue = Symbol('return');

	test('restart returns seed', () => {
		const seed = Symbol('seed');
		const result = restart({ seed });

		expect(result).toEqual(seed);
	});

	test('decrease Health', () => {
		jest.spyOn(PlayerManager, 'decreaseHealth')
			.mockReturnValue(returnValue);

		const result = actions.decreaseHealth(context);

		expect(PlayerManager.decreaseHealth)
			.toHaveBeenCalledWith(context);
		expect(result).toEqual(returnValue);
	});

	test('Background Moving Axis check', () => {
		jest.spyOn(PlayerManager, 'backGroundMovingAxis')
			.mockReturnValue(returnValue);

		const result = actions.backGroundMovingAxis(context);

		expect(PlayerManager.backGroundMovingAxis)
			.toHaveBeenCalledWith(context);
		expect(result).toEqual(returnValue);
	});

	test('updateMousePosition', () => {
		jest.spyOn(PositionService, 'pxToPercentage')
			.mockReturnValue(returnValue);

		const expected = { position: { x: returnValue, y: returnValue }};
		const data = {
			view: { innerWidth: Symbol('innerWidth') },
			clientX: Symbol('clientX'),
		};

		const result = updateMousePosition({ data });

		expect(result).toMatchObject(expected);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientX, data.view.innerWidth);
	});

	test('updateFlightPosition', () => {
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);

		const expected = { flight: { x: returnValue }};
		const state = { flight: { x: returnValue, width: returnValue },
			position: { x: returnValue }};

		const result = updateFlightPosition({ state });

		expect(result).toEqual(expected);
	});

	test('generateBullets returns bullets[]', () => {
		jest.spyOn(GameService, 'generateBullets').mockReturnValue(returnValue);
		jest.spyOn(PositionService, 'bulletPos')
			.mockReturnValue(returnValue);

		const expected = { bullets: returnValue };
		const con = { state: { bullets: [] }};

		const result = generateBullets(con);

		expect(result).toEqual(expected);
		expect(PositionService.bulletPos)
			.toHaveBeenCalledWith(con);
		expect(GameService.generateBullets)
			.toHaveBeenCalledWith(con.state.bullets, returnValue);
	});

	test('add Targets ', () => {
		jest.spyOn(targetManager, 'addTargets')
			.mockReturnValue(returnValue);

		const result = addTargets(context);

		expect(targetManager.addTargets).toHaveBeenCalledWith(context);
		expect(result).toMatchObject({ targets: returnValue });
	});

	test('Update cloud Position Test ', () => {
		jest.spyOn(PlayerManager, 'updateCloudPosition')
			.mockReturnValue(returnValue);

		const result = updateCloudPosition(context);
		const expected = { objects: returnValue };

		expect(PlayerManager.updateCloudPosition).toHaveBeenCalledWith(context);
		expect(result).toMatchObject(expected);
	});

	test('Reset cloud Position Test ', () => {
		jest.spyOn(PlayerManager, 'resetCloudPosition')
			.mockReturnValue(returnValue);

		const result = resetCloudPosition(context);
		const expected = { objects: returnValue };

		expect(PlayerManager.resetCloudPosition).toHaveBeenCalledWith(context);
		expect(result).toMatchObject(expected);
	});

	test('Move Bullets by decreasing bullet yPos', () => {
		jest.spyOn(PlayerManager, 'moveBullets').mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = moveBullets(context);

		expect(result).toEqual(expected);
		expect(PlayerManager.moveBullets).toHaveBeenCalledWith(context);
	});
});

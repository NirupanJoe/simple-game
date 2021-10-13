/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import actions from '../core/actions';
import PlayerManager from '../services/playerManger';
import context from '../core/context';
import PositionService from '../services/positionService';
import targetManager from '../services/targetManager';
import config from './config';
import GameService from '../services/gameService';

describe('actions', () => {
	const { restart,
		updateMousePosition,
		addTargets,
		updateCloudPosition,
		resetCloudPosition,
		generateBullets,
		moveBullets } = actions;

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

	test('updateMousePosition returns flight.x', () => {
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);
		jest.spyOn(PositionService, 'pxToPercentage')
			.mockReturnValue(returnValue);

		const expected = { flight: { x: returnValue }};
		const state = { flight: { x: Symbol('x'), width: Symbol('width') }};
		const data = {
			view: { innerWidth: Symbol('innerWidth') },
			clientX: Symbol('clientX'),
		};

		const result = updateMousePosition({ state, data });

		expect(result).toMatchObject(expected);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientX, data.view.innerWidth);
		expect(PositionService.project)
			.toHaveBeenCalledWith(returnValue, state.flight.width);
	});

	test('generateBullets returns bullets[]', () => {
		jest.spyOn(GameService, 'generateBullets').mockReturnValue(returnValue);
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);
		jest.spyOn(PositionService, 'pxToPercentage')
			.mockReturnValue(returnValue);

		const expected = { bullets: returnValue };
		const state = { bullets: [] };
		const data = {
			view: { innerWidth: Symbol('innerWidth') },
			clientX: Symbol('clientX'),
		};

		const result = generateBullets({ state, data });

		expect(result).toEqual(expected);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientX, data.view.innerWidth);
		expect(PositionService.project)
			.toHaveBeenCalledWith(returnValue, config.bulletWidth);
		expect(GameService.generateBullets)
			.toHaveBeenCalledWith(state.bullets, returnValue);
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

	test('Move Bullets by decreasing bullet yPos0', () => {
		jest.spyOn(PlayerManager, 'moveBullets').mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = moveBullets(context);

		expect(result).toEqual(expected);
		expect(PlayerManager.moveBullets).toHaveBeenCalledWith(context);
	});
});

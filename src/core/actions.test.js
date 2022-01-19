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
		updateFlightPosition,
		processBullets,
		clearHitBullets,
		updateScore,
		removeTargets,
		gameStart } = actions;

	const returnValue = Symbol('return');

	test('restart returns seed', () => {
		const { seed } = context;
		const result = restart({ seed });

		expect(result).toEqual({ ...seed, ready: true });
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
			.mockReturnValueOnce(returnValue)
			.mockReturnValueOnce(returnValue);

		const expected = { position: { x: returnValue, y: returnValue }};
		const data = {
			view: {
				innerWidth: Symbol('innerWidth'),
				innerHeight: Symbol('innerHeight'),
			},
			clientX: Symbol('clientX'),
			clientY: Symbol('clientY'),
		};

		const result = updateMousePosition({ data });

		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientX, data.view.innerWidth);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientY, data.view.innerHeight);

		expect(result).toMatchObject(expected);
	});

	test('updateFlightPosition', () => {
		jest.spyOn(PositionService, 'limitMovement')
			.mockReturnValue(returnValue);

		const expected = { flight: { x: returnValue }};

		const result = updateFlightPosition(context);

		expect(PositionService.limitMovement).toBeCalledWith(context);

		expect(result).toEqual(expected);
	});

	test('generateBullets returns bullets[]', () => {
		jest.spyOn(GameService, 'generateBullets').mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = generateBullets(context);

		expect(GameService.generateBullets)
			.toHaveBeenCalledWith(context);

		expect(result).toEqual(expected);
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

		expect(PlayerManager.moveBullets).toHaveBeenCalledWith(context);

		expect(result).toEqual(expected);
	});

	test('process Bullets', () => {
		jest.spyOn(PlayerManager, 'processHits')
			.mockReturnValue(returnValue);

		const expected = returnValue;

		const result = processBullets(context);

		expect(PlayerManager.processHits).toHaveBeenCalledWith(context);

		expect(result).toEqual(expected);
	});

	test('clearHitBullets test', () => {
		jest.spyOn(PlayerManager, 'removeHitBullets')
			.mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = clearHitBullets(context);

		expect(PlayerManager.removeHitBullets).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('updateScore test', () => {
		jest.spyOn(PlayerManager, 'updateScore')
			.mockReturnValue(returnValue);

		const expected = { score: returnValue };

		const result = updateScore(context);

		expect(PlayerManager.updateScore).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('removeTargets test', () => {
		jest.spyOn(PlayerManager, 'removeTargets')
			.mockReturnValue(returnValue);

		const expected = { targets: returnValue };

		const result = removeTargets(context);

		expect(PlayerManager.removeTargets).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('gameStart', () => {
		const data = Symbol('data');
		const expected = { ready: data };

		const result = gameStart({ data });

		expect(result).toMatchObject(expected);
	});
});

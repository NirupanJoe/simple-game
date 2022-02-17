import actions from '../core/actions';
import playerManager from '../services/playerManager';
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
		generateClouds,
		gameStart,
		setAudio,
		setHelp } = actions;

	const returnValue = Symbol('return');

	test('restart returns seed', () => {
		const { seed } = context;
		const result = restart({ seed });

		expect(result).toEqual({ ...seed, ready: true });
	});

	test('decrease Health', () => {
		jest.spyOn(playerManager, 'decreaseHealth')
			.mockReturnValue(returnValue);

		const result = actions.decreaseHealth(context);

		expect(playerManager.decreaseHealth)
			.toHaveBeenCalledWith(context);

		expect(result).toEqual(returnValue);
	});

	test('Background Moving Axis check', () => {
		jest.spyOn(playerManager, 'backGroundMovingAxis')
			.mockReturnValue(returnValue);

		const result = actions.backGroundMovingAxis(context);

		expect(playerManager.backGroundMovingAxis)
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
		jest.spyOn(playerManager, 'updateCloudPosition')
			.mockReturnValue(returnValue);

		const result = updateCloudPosition(context);
		const expected = { objects: returnValue };

		expect(playerManager.updateCloudPosition).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('Reset cloud Position Test ', () => {
		jest.spyOn(playerManager, 'resetCloudPosition')
			.mockReturnValue(returnValue);

		const result = resetCloudPosition(context);
		const expected = { objects: returnValue };

		expect(playerManager.resetCloudPosition).toHaveBeenCalledWith(context);
		expect(result).toMatchObject(expected);
	});

	test('Move Bullets by decreasing bullet yPos', () => {
		jest.spyOn(playerManager, 'moveBullets').mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = moveBullets(context);

		expect(result).toEqual(expected);
		expect(playerManager.moveBullets).toHaveBeenCalledWith(context);
	});

	test('process Bullets', () => {
		jest.spyOn(playerManager, 'processHits')
			.mockReturnValue(returnValue);

		const expected = returnValue;

		const result = processBullets(context);

		expect(playerManager.processHits).toHaveBeenCalledWith(context);
		expect(result).toEqual(expected);
	});

	test('clearHitBullets test', () => {
		jest.spyOn(playerManager, 'removeHitBullets')
			.mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = clearHitBullets(context);

		expect(playerManager.removeHitBullets).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('updateScore test', () => {
		jest.spyOn(playerManager, 'updateScore')
			.mockReturnValue(returnValue);

		const expected = { score: returnValue };

		const result = updateScore(context);

		expect(playerManager.updateScore).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});

	test('removeTargets test', () => {
		jest.spyOn(playerManager, 'removeTargets')
			.mockReturnValue(returnValue);

		const expected = { targets: returnValue };

		const result = removeTargets(context);

		expect(playerManager.removeTargets).toHaveBeenCalledWith(context);

		expect(result).toMatchObject(expected);
	});
	test('test generateClouds', () => {
		jest.spyOn(playerManager, 'generateClouds')
			.mockReturnValue(returnValue);
		const result = generateClouds(context);
		const expected = { objects: returnValue };

		expect(playerManager.generateClouds).toHaveBeenCalledWith(context);
		expect(result).toMatchObject(expected);
	});

	test('gameStart', () => {
		const data = Symbol('data');
		const expected = { ready: data };

		const result = gameStart({ data });

		expect(result).toMatchObject(expected);
	});

	test('setAudio', () => {
		const data = Symbol('data');

		const result = setAudio({ data });

		expect(result).toMatchObject({ audio: data });
	});

	test('setHelp', () => {
		const data = Symbol('data');

		const result = setHelp({ data });

		expect(result).toMatchObject({ help: data });
	});
});

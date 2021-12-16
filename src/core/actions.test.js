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
		processBullet,
		clearHitBullets } = actions;

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

		expect(result).toMatchObject(expected);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientX, data.view.innerWidth);
		expect(PositionService.pxToPercentage)
			.toHaveBeenCalledWith(data.clientY, data.view.innerHeight);
	});

	test('updateFlightPosition', () => {
		jest.spyOn(PositionService, 'limitMovement')
			.mockReturnValue(returnValue);

		const expected = { flight: { x: returnValue }};

		const result = updateFlightPosition(context);

		expect(result).toEqual(expected);
		expect(PositionService.limitMovement).toBeCalledWith(context);
	});

	test('generateBullets returns bullets[]', () => {
		jest.spyOn(GameService, 'generateBullets').mockReturnValue(returnValue);

		const expected = { bullets: returnValue };
		const con = { state: { bullets: [] }};

		const result = generateBullets(con);

		expect(result).toEqual(expected);
		expect(GameService.generateBullets)
			.toHaveBeenCalledWith(con);
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

	test('process Bullet', () => {
		jest.spyOn(PlayerManager, 'detectBulletHit')
			.mockReturnValue(returnValue);

		const expected = { bullets: returnValue };

		const result = processBullet(context);

		expect(result).toEqual(expected);
		expect(PlayerManager.detectBulletHit).toHaveBeenCalledWith(context);
	});

	test('clearHitBullets test', () => {
		jest.spyOn(PlayerManager, 'removeHitBullets')
			.mockReturnValue(returnValue);

		const result = clearHitBullets(context);
		const expected = { bullets: returnValue };

		expect(PlayerManager.removeHitBullets).toHaveBeenCalledWith(context);
		expect(result).toMatchObject(expected);
	});
});

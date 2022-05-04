/* eslint-disable max-lines */
import PositionService from './positionService';
import PlayerManager from './playerManager';
import config from '../core/config';
import * as collection from '@laufire/utils/collection';
import { random } from '@laufire/utils';
import * as helperService from './helperService';
import { rndBetween } from '@laufire/utils/lib';
import helper from '../testHelper/helper';

describe('PlayerManager', () => {
	const { isAlive, decreaseHealth, backGroundMovingAxis,
		updateBackgroundObjects, resetBackgroundObjects, moveBullets,
		detectBulletHit, removeHitBullets,
		generateObjects, createObjects, removeTargets,
		isBulletHit, calDamage, detectOverLapping
		, collectHits, updateHealth, processHits,
		filterBullet, updateScore, getObjects } = PlayerManager;
	const { range, secure, keys } = collection;
	const hundred = 100;
	const two = 2;
	const four = 4;
	const ten = 10;
	const returnValue = Symbol('returnValue');
	const rndRange = secure(range(0, random.rndBetween(1, ten)));

	describe('isAlive', () => {
		const expectations = [
			['less than', false, 0],
			['greater than', true, 1],
		];

		test.each(expectations)('when the health is %p 0 isAlive return %p',
			(
				dummy, expected, health
			) => {
				const result = isAlive({ state: { health }});

				expect(result).toEqual(expected);
			});
	});
	describe('Decrease Health', () => {
		const state = {
			health: 100,
		};

		test('decrease Health', () => {
			const result = decreaseHealth({ state, config });
			const expectation = {
				health: state.health - config.damage,
			};

			expect(result).toEqual(expectation);
		});
	});

	test('backGroundMovingAxis', () => {
		const state = {
			bgnScreenY: 0,
		};
		const result = backGroundMovingAxis({ state, config });
		const expectation = {
			bgnScreenY:
			(state.bgnScreenY + config.bgnScreenYIncre) % hundred,
		};

		expect(result).toEqual(expectation);
	});

	describe('removeHitBullets test', () => {
		const state = {
			bullets: [{
				id: 320,
				isHit: true,
			},
			{
				id: 201,
				isHit: false,
			}],
		};

		test('Test removeHitBullets', () => {
			const result = removeHitBullets({ state });

			const expectation = [{
				id: 201,
				isHit: false,
			}];

			expect(result).toMatchObject(expectation);
		});
	});

	describe('moveBullets', () => {
		const state = {
			bullets: [{
				y: 100,
			}],
		};

		test('moveBullets decrease yPos', () => {
			const expected = [{
				y: 95,
			}];
			const result = moveBullets({ state, config });

			expect(result).toEqual(expected);
		});
	});

	test('detectBulletHit', () => {
		const targets = Symbol('targets');
		const bullets = [
			{ id: 14569,
				isHit: true },
		];
		const state = {
			targets, bullets,
		};
		const expectation = [
			{ id: 14569,
				isHit: returnValue },
		];

		jest.spyOn(PlayerManager, 'isBulletHit')
			.mockReturnValue(returnValue);

		const result = detectBulletHit({ state });

		expect(result).toMatchObject(expectation);
		expect(PlayerManager.isBulletHit)
			.toHaveBeenCalledWith(targets, bullets[0]);
	});

	describe('isBulletHit', () => {
		const target = Symbol('targetValue');
		const bullet = Symbol('bulletValue');

		const expectations = [
			[false, undefined],
			[true, bullet],
		];

		test.each(expectations)('isBulletHit %p',
			(expected, detectOverlap) => {
				jest.spyOn(PlayerManager, 'detectOverLapping')
					.mockReturnValue(detectOverlap);
				jest.spyOn(PositionService, 'getAllPoints')
					.mockReturnValueOnce(bullet)
					.mockReturnValue(target);

				const result = isBulletHit(bullet, target);

				expect(PlayerManager.detectOverLapping)
					.toHaveBeenCalledWith(bullet, target);
				[bullet, target].map((data) =>
					expect(PositionService.getAllPoints)
						.toHaveBeenCalledWith(data));

				expect(result).toEqual(expected);
			});
	});

	test('calDamage', () => {
		const target = { health: random.rndBetween(0, ten) };
		const bullets = secure(rndRange.map((data) => ({ damage: data })));

		let sum = 0;

		bullets.forEach((bullet) => {
			sum += bullet.damage;
		});

		const expectation = Math.max(target.health - sum, 0);

		const result = calDamage(target, bullets);

		expect(result).toEqual(expectation);
	});

	describe('detectOverLapping', () => {
		const bulletValue = Symbol('bulletValue');
		const targetValue = Symbol('targetValue');
		const expectations = [
			[false, undefined],
			[true, bulletValue],
		];

		const bullet = { bulletValue };
		const target = { targetValue };

		test.each(expectations)('detectOverLapping %p',
			(returnFlag, expected) => {
				jest.spyOn(PositionService, 'isPointInRect')
					.mockReturnValue(returnFlag);

				const result = detectOverLapping(bullet, target);

				expect(result).toEqual(expected);
				expect(PositionService.isPointInRect)
					.toHaveBeenCalledWith(bulletValue, target);
			});
	});

	test('collectHits', () => {
		const targets = secure(rndRange.map((data) => ({ id: data })));

		const bullets = Symbol('bullets');

		const data = { targets, bullets };

		const expectation = targets.map(() => returnValue);

		jest.spyOn(PlayerManager, 'collectEachTargetHits')
			.mockReturnValue(returnValue);

		const result = collectHits({ data });

		targets.forEach((target) => expect(PlayerManager.collectEachTargetHits)
			.toHaveBeenCalledWith(target, bullets));
		expect(result).toMatchObject(expectation);
	});

	test('collectEachTargetHits', () => {
		const target = Symbol('targetValue');
		const bullets = Symbol('bulletsValue');

		jest.spyOn(PlayerManager, 'filterBullet')
			.mockReturnValue(returnValue);

		const expectation = { target: target,
			bullets: returnValue };

		const result = PlayerManager.collectEachTargetHits(target, bullets);

		expect(PlayerManager.filterBullet)
			.toHaveBeenCalledWith(bullets, target);

		expect(result).toEqual(expectation);
	});

	test('updateHealth', () => {
		const target = { target: Symbol('targetValue') };
		const bullets = Symbol('bullets');

		const hits = [{ target, bullets }];

		const expectation = [{ ...target, health: two }];

		jest.spyOn(PlayerManager, 'calDamage').mockReturnValue(two);

		const result = updateHealth(hits);

		expect(result).toMatchObject(expectation);
	});

	describe('updateBulletIsHit', () => {
		const bullets = secure(rndRange
			.map((data) => ({ id: data, isHit: false })));

		const hitBullets = random.rndValues(bullets, two)
			.map((data) => ({ ...data, isHit: true }));

		const hitBulletIds = hitBullets.map((bullet) => bullet.id);

		const bulletsExpected = bullets.map((bullet) => (
			{ ...bullet, isHit: hitBulletIds.includes(bullet.id) }));

		const expectations = [
			[hitBullets, bulletsExpected],
			[[{}], bullets],
		];

		test.each(expectations)('updateBulletIsHit %p',
			(hits, expected) => {
				const result = PlayerManager
					.updateBulletIsHit(hits, bullets);
				const resultCheck = result;

				expect(resultCheck).toMatchObject(expected);
			});
	});

	test('processHits', () => {
		const targets = Symbol('targets');
		const bullets = Symbol('bullets');
		const flattenBulletsValue = Symbol('flattenBulletsValue');
		const data = { targets, bullets };
		const context = { state: { ...data }};
		const expected = { ...data };

		jest.spyOn(PlayerManager, 'collectHits').mockReturnValue(returnValue);
		jest.spyOn(PlayerManager, 'updateHealth').mockReturnValue(targets);
		jest.spyOn(PlayerManager, 'updateBulletIsHit')
			.mockReturnValue(bullets);
		jest.spyOn(helperService, 'flattenBullets')
			.mockReturnValue(flattenBulletsValue);

		const result = processHits(context);

		expect(PlayerManager.collectHits)
			.toHaveBeenCalledWith({ ...context, data });
		expect(PlayerManager.updateHealth).toHaveBeenCalledWith(returnValue);
		expect(helperService.flattenBullets).toHaveBeenCalledWith(returnValue);
		expect(PlayerManager.updateBulletIsHit)
			.toHaveBeenCalledWith(flattenBulletsValue, bullets);

		expect(result).toEqual(expected);
	});

	test('filterBullet', () => {
		const bullets = secure(rndRange.map((data) => ({ id: data })));

		const rndBullets = random.rndValues(bullets, four);
		const rndBulletIds = rndBullets.map((data) => data.id);

		const target = Symbol('target');
		const expectation = rndBullets;

		jest.spyOn(PlayerManager, 'isBulletHit')
			.mockImplementation((bullet) => rndBulletIds.includes(bullet.id));

		const result = filterBullet(bullets, target);

		bullets.forEach((bullet) =>
			expect(PlayerManager.isBulletHit)
				.toHaveBeenCalledWith(bullet, target));

		expect(result).toMatchObject(expectation);
	});

	test('updateScore', () => {
		helper.retry(() => {
			const rndRangeNum = secure(range(0, random.rndBetween(1, ten)));
			const targets = secure(rndRangeNum
				.map((data) => ({ id: data, health:
				rndBetween(0, four) })));
			const score = rndBetween(0, ten);

			const damagedTargets = targets.filter((target) =>
				target.health === 0);

			const expectation = damagedTargets.length + score;

			const result = updateScore({ state: { targets, score }});

			expect(result).toEqual(expectation);
		});
	});

	test('removeTargets', () => {
		const targets = secure(rndRange.map((data) =>
			({ id: data, health: rndBetween(0, four) })));
		const expectation = [];

		targets.forEach((target) =>
			target.health !== 0 && expectation.push(target));

		const result = removeTargets({ state: { targets }});

		expect(result).toMatchObject(expectation);
	});
	describe('Test generateObjects and getObjects', () => {
		const prob = Symbol('prob');
		const height = Symbol('height');
		const width = Symbol('width');
		const types = keys(config.objects);
		const type = Symbol('type');
		const context = {
			config: {
				objects: {
					cloud: {
						prob,
						height,
						width,
						type,
					},
					ship: {
						prob,
						height,
						width,
						type,
					},
				},

			},
			state: {
				objects: [Symbol('objects')],
			},
			data: types,
		};

		test(' generateObjects is performed', () => {
			const objectKeys = Symbol('objectKeys');
			const newObjects = [Symbol('newObjects')];

			jest.spyOn(collection, 'keys').mockReturnValue(objectKeys);

			jest.spyOn(PlayerManager, 'createObjects')
				.mockReturnValue(newObjects);
			const result = generateObjects(context);

			expect(PlayerManager.createObjects)
				.toHaveBeenCalledWith({ ...context, data: objectKeys });
			expect(collection.keys)
				.toHaveBeenCalledWith(context.config.objects);
			expect(result).toEqual([...context.state.objects, ...newObjects]);
		});

		test('to test getObjects', () => {
			const item = random.rndValue(context.data);
			const rndString = Symbol('rndString');
			const num = random.rndBetween(0, hundred);

			jest.spyOn(PositionService, 'getRandomValue')
				.mockReturnValueOnce(num)
				.mockReturnValueOnce(num);

			jest.spyOn(random, 'rndString').mockReturnValue(rndString);
			jest.spyOn(PositionService, 'getRandomValue')
				.mockReturnValue(width);
			jest.spyOn(PositionService, 'getRandomValue')
				.mockReturnValue(height);

			const result = getObjects({ ...context,
				data: context.config.objects[item] });

			const expected = {
				height: context.config.objects[item].height,
				width: context.config.objects[item].width,
				x: num,
				y: -num,
			};

			expect(result).toMatchObject(expected);
		});
	});

	describe('Test updateBackgroundObjects and resetBackgroundObjects', () => {
		const ninetyNine = 99;

		test('Test updateBackgroundObjects', () => {
			const state
			= { objects: [{ y: rndBetween() }, { y: rndBetween() }] };
			const result = updateBackgroundObjects({ state, config });

			const expectation = state.objects.map((obj) => ({
				...obj,
				y: obj.y + config.bgnScreenYIncre,
			}));

			expect(result).toMatchObject(expectation);
		});

		test('resetBackgroundObjects is executed', () => {
			const state = {
				objects: [
					{ y: rndBetween(0, ninetyNine) },
					{ y: rndBetween(0, ninetyNine) },
				],
			};
			const result = resetBackgroundObjects({ state });

			expect(result).toMatchObject(state.objects);
		});

		test('resetBackgroundObjects is not executed', () => {
			const state = {
				objects: [
					{ y: 101 },
					{ y: 110 },
				],
			};
			const result = resetBackgroundObjects({ state });

			const expectation = [];

			expect(result).toMatchObject(expectation);
		});
	});
	test('processEnemyBullets', () => {
		const context = {
			state: {	enemyBullets: Symbol('enemyBullet'),
				flight: Symbol('flight'),
				health: Symbol('health') },
		};
		const hits = [{ bullets: Symbol('bullets'),
			target: { id: Symbol('id') }}];

		const addedHealth = [{ bullets: Symbol('bullets'),
			target: { id: Symbol('id'), health: context.state.health }}];

		const flattenBullets = Symbol('flattenBullets');
		const updatedBullets = Symbol('UpdatedBullets');
		const data = { targets: [context.state.flight],
			bullets: context.state.enemyBullets };

		const expectation = { health: addedHealth[0].health,
			enemyBullets: updatedBullets };

		jest.spyOn(PlayerManager, 'collectHits').mockReturnValue(hits);
		jest.spyOn(PlayerManager, 'updateHealth')
			.mockReturnValue(addedHealth);
		jest.spyOn(helperService, 'flattenBullets')
			.mockReturnValue(flattenBullets);
		jest.spyOn(PlayerManager, 'updateBulletIsHit')
			.mockReturnValue(updatedBullets);

		const result = PlayerManager.processEnemyBullets(context);

		expect(PlayerManager.collectHits)
			.toHaveBeenCalledWith({ ...context, data });
		expect(result).toEqual(expectation);
	});

	describe('to test create Objects', () => {
		const types = keys(config.objects);
		const objects = Symbol('objects');
		const mockContext = {
			data: types,
			config: config,
		};

		test('Objects are created', () => {
			jest.spyOn(helperService, 'isProbable').mockReturnValue(true);
			jest.spyOn(PlayerManager, 'getObjects')
				.mockReturnValue(objects);

			const result = createObjects(mockContext);
			const expected = types.map(() => objects);

			types.map((type) => {
				expect(helperService.isProbable)
					.toHaveBeenCalledWith(mockContext
						.config.objects[type].prob);
				expect(PlayerManager.getObjects)
					.toHaveBeenCalledWith({ ...mockContext,
						data: mockContext.config.objects[type] });
			});
			expect(result).toEqual(expected);
		});

		test('Objects are not created', () => {
			jest.spyOn(helperService, 'isProbable').mockReturnValue(false);

			const result = createObjects(mockContext);
			const expected = [];

			types.map((type) => {
				expect(helperService.isProbable)
					.toHaveBeenCalledWith(mockContext
						.config.objects[type].prob);
			});

			expect(result).toEqual(expected);
		});
	});
});

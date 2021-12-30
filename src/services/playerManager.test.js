/* eslint-disable max-lines */
import PositionService from './positionService';
import PlayerManager from './playerManager';
import config from '../core/config';
import { range, secure } from '@laufire/utils/collection';
import { random } from '@laufire/utils';
import * as helperService from './helperService';
import { rndBetween } from '@laufire/utils/lib';

describe('PlayerManager', () => {
	const { isAlive, decreaseHealth, backGroundMovingAxis,
		updateCloudPosition, resetCloudPosition, moveBullets,
		detectBulletHit, removeHitBullets,
		generateClouds, createCloud, removeTargets,
		isBulletHit, calDamage, detectOverLapping
		, collectHits, updateHealth, processHits,
		filterBullet, updateScore } = PlayerManager;
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

	describe('Cloud services test', () => {
		const state = {
			objects: [{
				x: 20,
				y: 0,
				type: 'Cloud',
			},
			{
				x: 50,
				y: 100,
				type: 'Cloud',
			}],
		};

		test('Test UpdateCloud Position', () => {
			const result = updateCloudPosition({ state, config });

			const expectation = state.objects.map((obj) => ({
				...obj,
				y: obj.y + config.bgnScreenYIncre,
			}));

			expect(result).toMatchObject(expectation);
		});

		test('Test resetCloud Position', () => {
			const result = resetCloudPosition({ state });

			const expectation = [{
				x: 20,
				y: 0,
				type: 'Cloud',
			}];

			expect(result).toMatchObject(expectation);
		});
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

		const context = { state: { targets, bullets }};

		const expectation = targets.map((data) =>
			({ target: data, bullets: returnValue }));

		jest.spyOn(PlayerManager, 'filterBullet').mockReturnValue(returnValue);

		const result = collectHits(context);

		targets.forEach((target) => expect(PlayerManager.filterBullet)
			.toHaveBeenCalledWith(bullets, target));
		expect(result).toMatchObject(expectation);
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
					.updateBulletIsHit(hits, { state: { bullets }});
				const resultCheck = result;

				expect(resultCheck).toMatchObject(expected);
			});
	});

	test('processHits', () => {
		const targets = Symbol('targets');
		const bullets = Symbol('bullets');
		const flattenBulletsValue = Symbol('flattenBulletsValue');
		const context = Symbol('context');
		const expected = { targets, bullets };

		jest.spyOn(PlayerManager, 'collectHits').mockReturnValue(returnValue);
		jest.spyOn(PlayerManager, 'updateHealth').mockReturnValue(targets);
		jest.spyOn(PlayerManager, 'updateBulletIsHit')
			.mockReturnValue(bullets);
		jest.spyOn(helperService, 'flattenBullets')
			.mockReturnValue(flattenBulletsValue);

		const result = processHits(context);

		expect(PlayerManager.collectHits).toHaveBeenCalledWith(context);
		expect(PlayerManager.updateHealth).toHaveBeenCalledWith(returnValue);
		expect(helperService.flattenBullets).toHaveBeenCalledWith(returnValue);
		expect(PlayerManager.updateBulletIsHit)
			.toHaveBeenCalledWith(flattenBulletsValue, context);

		expect(result).toMatchObject(expected);
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
		const targets = secure(rndRange.map((data) => ({ id: data, health:
			rndBetween(0, four) })));
		const score = rndBetween(0, ten);

		const damagedTargets = targets.filter((target) =>
			target.health === 0);

		const expectation = damagedTargets.length + score;

		const result = updateScore({ state: { targets, score }});

		expect(result).toEqual(expectation);
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
	describe('Test Clouds', () => {
		const prob = Symbol('prob');
		const height = Symbol('height');
		const width = Symbol('width');
		const context = {
			config: {
				objects: {
					cloud: {
						prob,
						height,
						width,
					},
				},

			},
			state: {
				objects: Symbol('objects'),
			},
		};

		test('Generate clouds is performed', () => {
			jest.spyOn(helperService, 'isProbable').mockReturnValue(true);
			jest.spyOn(PlayerManager, 'createCloud')
				.mockReturnValue(returnValue);
			const result = generateClouds(context);

			expect(helperService.isProbable)
				.toHaveBeenCalledWith(prob);
			expect(PlayerManager.createCloud)
				.toHaveBeenCalledWith(context);
			expect(result).toEqual(returnValue);
		});

		test('Generate clouds is not performed', () => {
			const expected = context.state.objects;

			jest.spyOn(helperService, 'isProbable').mockReturnValue(false);

			const result = generateClouds(context);

			expect(helperService.isProbable)
				.toHaveBeenCalledWith(context.config.objects.cloud.prob);
			expect(result).toEqual(expected);
		});

		// eslint-disable-next-line max-statements
		test('To test createCLouds', () => {
			const mockContext = {
				...context,
				state: {
					objects: [Symbol('object1')],
				},

			};
			const x = Symbol('x');
			const y = random.rndBetween(1, hundred);
			const id = Symbol('id');

			jest.spyOn(PositionService, 'getRandomValue')
				.mockReturnValueOnce(x)
				.mockReturnValueOnce(y);

			jest.spyOn(random, 'rndString').mockReturnValue(id);

			const result = createCloud(mockContext);
			const expectation = [
				...mockContext.state.objects, {
					x: x,
					y: -y,
					id: id,
					height: mockContext.config.objects.cloud.height,
					width: mockContext.config.objects.cloud.width,

				},
			];

			expect(random.rndString)
				.toHaveBeenCalledWith(mockContext.config.rndLength);
			expect(PositionService.getRandomValue)
				.toHaveBeenCalledWith(mockContext.config.objects.cloud.width);
			expect(PositionService.getRandomValue)
				.toHaveBeenCalledWith(mockContext.config.objects.cloud.height);

			expect(result).toMatchObject(expectation);
		});
	});
});

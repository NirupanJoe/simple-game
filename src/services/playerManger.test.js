/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
import PositionService from './positionService';
import PlayerManager from './playerManger';
import config from '../core/config';

describe('PlayerManger', () => {
	const { isAlive, decreaseHealth, backGroundMovingAxis,
		updateCloudPosition, resetCloudPosition, moveBullets,
		detectBulletHit, removeHitBullets } = PlayerManager;
	const hundred = 100;

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
		const returnValue = Symbol('returnValue');
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

		jest.spyOn(PositionService, 'isBulletHit')
			.mockReturnValue(returnValue);

		const result = detectBulletHit({ state });

		expect(result).toMatchObject(expectation);
		expect(PositionService.isBulletHit)
			.toHaveBeenCalledWith(targets, bullets[0]);
	});
});

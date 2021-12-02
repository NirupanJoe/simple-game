/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/lib';
import GameService from './gameService';
import * as HelperService from './helperService';
import { collection, random } from '@laufire/utils';

describe('testing gameService', () => {
	const two = 2;
	const five = 5;
	const ten = 10;

	const { healthColor, generateBullets,
		getType, ceilHealth, makeBullet } = GameService;

	test('healthColor returns appropriate color for given health', () => {
		let i = 0;
		const maxLoop = 1000;
		const limit = 100;
		const low = 20;
		const mid = 50;

		for(i = 0;i < maxLoop; i++) {
			const health = Math.floor(Math.random() * limit);
			const result = healthColor(health);

			health <= low
				? expect(result).toEqual('red')
				: health <= mid
					? expect(result).toEqual('yellow')
					: expect(result).toEqual('greenYellow');
		}
	});

	test('makeBullets', () => {
		const id = Symbol('id');
		const xPos = Symbol('x');
		const y = Symbol('y');

		jest.spyOn(random, 'rndString').mockReturnValue(id);

		const context = {
			state: {
				flight: {
					x: xPos,
				},
			},
			config: {
				rndLength: Symbol('rndLength'),
				bulletYAxis: y,
			},
		};
		const getData = { data: Symbol('data') };

		const expected = {
			...getData,
			id: id,
			x: xPos,
			y: y,
			isHit: false,
		};

		const result = makeBullet({ ...context, data: getData });

		expect(result).toMatchObject(expected);
		expect(random.rndString).toHaveBeenCalledWith(context.config.rndLength);
	});

	describe('getType', () => {
		const context = {
			config: {
				bulletsType: {
					normal: { prob: Symbol('normalProb') },
					superBullet: { prob: Symbol('superProb') },
				},
				defaultBulletType: 'normal',
			},
		};

		test('returns normal from bulletsTypeKeys when true', () => {
			jest.spyOn(collection, 'keys');
			jest.spyOn(HelperService, 'isProbable')
				.mockReturnValueOnce(false)
				.mockReturnValue(true);
			const expected = context.config.bulletsType.superBullet;

			const result = getType(context);

			expect(result).toEqual(expected);
			expect(collection.keys)
				.toHaveBeenCalledWith(context.config.bulletsType);
			expect(HelperService.isProbable)
				.toHaveBeenNthCalledWith(1, context
					.config.bulletsType.normal.prob);
			expect(HelperService.isProbable)
				.toHaveBeenNthCalledWith(two, context
					.config.bulletsType.superBullet.prob);
		});

		test('returns normal from config.defaultBulletType when undefined'
			, () => {
				jest.spyOn(collection, 'keys');
				jest.spyOn(HelperService, 'isProbable')
					.mockReturnValue(false);
				const expected = context.config.bulletsType.normal;

				const result = getType(context);

				expect(result).toEqual(expected);
				expect(collection.keys)
					.toHaveBeenCalledWith(context.config.bulletsType);
				expect(HelperService.isProbable)
					.toHaveBeenNthCalledWith(1, context
						.config.bulletsType.normal.prob);
				expect(HelperService.isProbable)
					.toHaveBeenNthCalledWith(two, context
						.config.bulletsType.superBullet.prob);
			});
	});

	test('generateBullets renders bullets[{}]', () => {
		const bulletType = Symbol('bulletType');
		const bullet = Symbol('bullet');
		const bullets = range(0, rndBetween(five, ten)).map(Symbol);

		jest.spyOn(GameService, 'makeBullet').mockReturnValue(bullet);
		jest.spyOn(GameService, 'getType').mockReturnValue(bulletType);
		const context = { state: { bullets: [bullets] }, config: {}};
		const data = { ...context, data: bulletType };
		const expected = [bullets, bullet];

		const result = generateBullets(context);

		expect(GameService.getType).toHaveBeenCalledWith(context);
		expect(GameService.makeBullet).toHaveBeenCalledWith(data);
		expect(result).toEqual(expected);
	});

	test('ceilBullet', () => {
		const health = 99.01;
		const expected = 100;
		const result = ceilHealth(health);

		expect(result).toEqual(expected);
	});
});

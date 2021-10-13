/* eslint-disable max-lines-per-function */
import GameService from './gameService';
import { random } from '@laufire/utils';
import config from '../core/config';

describe('testing gameService', () => {
	const { healthColor, generateBullets } = GameService;

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

	test('generateBullets renders bullets[{}]', () => {
		const xPos = Symbol('xPos');
		const bullets = [];
		const expected = [{
			id: Symbol('id'),
			type: 'normal',
			x: xPos,
			y: 90,
		}];

		jest.spyOn(random, 'rndString')
			.mockReturnValue(expected[0].id);

		const result = generateBullets(bullets, xPos);

		expect(random.rndString).toHaveBeenCalledWith(config.rndLength);
		expect(result).toEqual(expected);
	});
});

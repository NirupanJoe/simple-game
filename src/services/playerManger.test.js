/* eslint-disable max-lines-per-function */
import PlayerManager from './playerManger';
import config from '../core/config';

describe('PlayerManger', () => {
	const { isAlive, decreaseHealth, backGroundMovingAxis } = PlayerManager;
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
});

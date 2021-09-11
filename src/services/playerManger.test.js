import PlayerManager from './playerManger';

describe('PlayerManger', () => {
	const { isAlive } = PlayerManager;

	describe('isAlive', () => {
		const expectations = [
			['less then', false, 0],
			['greater then', true, 1],
		];

		test.each(expectations)('when the health is %p 0 isAlive return %p',
			(
				dummy, expected, health
			) => {
				const result = isAlive({ state: { health }});

				expect(result).toEqual(expected);
			});
	});
});

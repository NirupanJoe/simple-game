import GameService from './gameService';

describe('testing gameService', () => {
	test('healthColor returns appropriate color for given health', () => {
		let i = 0;
		const maxLoop = 1000;
		const limit = 100;
		const low = 20;
		const mid = 50;

		for(i = 0;i < maxLoop; i++) {
			const health = Math.floor(Math.random() * limit);
			const result = GameService.healthColor(health);

			health <= low
				? expect(result).toEqual('red')
				: health <= mid
					? expect(result).toEqual('yellow')
					: expect(result).toEqual('greenYellow');
		}
	});
});

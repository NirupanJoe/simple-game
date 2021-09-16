import Actions from '../core/actions';
import PlayerManager from '../services/playerManger';
import context from '../core/context';

describe('actions', () => {
	const { restart } = Actions;
	const returnValue = Symbol('return');

	test('restart returns seed', () => {
		const seed = Symbol('seed');
		const result = restart({ seed });

		expect(result).toEqual(seed);
	});

	test('decrease Health', () => {
		jest.spyOn(PlayerManager, 'decreaseHealth')
			.mockReturnValue(returnValue);

		const result = Actions.decreaseHealth(context);

		expect(PlayerManager.decreaseHealth)
			.toHaveBeenCalledWith(context);
		expect(result).toEqual(returnValue);
	});
});

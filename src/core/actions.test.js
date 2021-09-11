import Actions from '../core/actions';

describe('actions', () => {
	const { restart } = Actions;

	test('restart returns seed', () => {
		const seed = Symbol('seed');
		const result = restart({ seed });

		expect(result).toEqual(seed);
	});
});

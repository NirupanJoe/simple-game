import getMode from './urlService';
import config from '../core/config';

describe('getURLParam', () => {
	const context = { config };
	const mode = Symbol('mode');
	const expectations = [
		[undefined, config.defaultMode],
		[mode, mode],
	];

	test.each(expectations)('', (returnValue, expected) => {
		const get = jest.fn().mockReturnValue(returnValue);

		jest.spyOn(global, 'URLSearchParams').mockReturnValue({ get });

		const result = getMode(context);

		expect(get).toHaveBeenCalledWith('mode');
		expect(result).toEqual(expected);
	});
});

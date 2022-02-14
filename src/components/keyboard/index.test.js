import { keys } from '@laufire/utils/collection';
import { rndString, rndValue } from '@laufire/utils/random';
import React from 'react';
import Keyboard from '.';
import shortcut from './shortcut';

test('Keyboard', () => {
	const getKeys = keys(shortcut);

	[rndValue(getKeys), rndString()].forEach((key) => {
		const context = Symbol('context');
		const evt = { key } ;

		jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
		// eslint-disable-next-line no-undef
		jest.spyOn(window, 'addEventListener')
			.mockImplementation((d, fn) => fn(evt));
		getKeys.includes(key) && jest.spyOn(shortcut, `${ key }`).mockReturnValue();

		Keyboard(context);

		expect(React.useEffect).toHaveBeenCalledWith(expect.any(Function), []);
		getKeys.includes(key) && expect(shortcut[evt.key])
			.toHaveBeenCalledWith(context);
		// eslint-disable-next-line no-undef
		expect(window.addEventListener)
			.toHaveBeenCalledWith('keydown', expect.any(Function));
	});
});

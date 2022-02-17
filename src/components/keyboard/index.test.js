import { rndString } from '@laufire/utils/random';
import React from 'react';
import Keyboard from '.';
import shortcutManager from '../../services/shortcutManager';

test('Keyboard', () => {
	const key = rndString();
	const context = Symbol('context');
	const evt = { key } ;

	jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
	// eslint-disable-next-line no-undef
	jest.spyOn(window, 'addEventListener')
		.mockImplementation((d, fn) => fn(evt));
	jest.spyOn(shortcutManager, 'handleShortcut').mockReturnValue();

	Keyboard(context);

	expect(React.useEffect).toHaveBeenCalledWith(expect.any(Function), []);
	expect(shortcutManager.handleShortcut).toHaveBeenCalledWith({ ...context,
		data: { key }});
	// eslint-disable-next-line no-undef
	expect(window.addEventListener)
		.toHaveBeenCalledWith('keydown', expect.any(Function));
});

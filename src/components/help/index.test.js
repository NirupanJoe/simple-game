import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Help from '.';
import * as Container from '../container';
import ShortcutKey from './shortcutKey';

test('Help', () => {
	[true, false].map((help) => {
		const state = { help };
		const config = { shortcutKeys: Symbol('shortcutKeys') };
		const actions = {
			setHelp: jest.fn(),
		};
		const context = { state, actions, config };

		jest.spyOn(Container, 'default').mockReturnValue(<div/>);

		const component = render(Help(context)).container.children[0];

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('help');
		expect(component.children[0]).toBeInTheDocument();
		expect(component.children[0]).toHaveClass('helpButton');

		const shortcutKeys = () => {
			expect(component.children[1]).toBeInTheDocument();
			expect(component.children[1].children[0]).toBeInTheDocument();
			expect(component.children[1]).toHaveClass('shortcutKeys');
			expect(Container.default)
				.toHaveBeenCalledWith(config.shortcutKeys, ShortcutKey);
		};

		help && shortcutKeys();

		fireEvent.click(component.children[0]);

		expect(actions.setHelp).toHaveBeenCalledWith(!state.help);
	});
});

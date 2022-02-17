import { rndString } from '@laufire/utils/random';
import shortcut from '../components/keyboard/shortcut';
import config from '../core/config';
import shortcutManager from './shortcutManager';

describe('shortcutManager', () => {
	test('handlerShortcut is called', () => {
		config.shortcutKeys.map(({ key, action }) => {
			const data = { key };
			const context = { data };

			jest.spyOn(shortcut, `${ action }`).mockReturnValue();

			shortcutManager.handleShortcut(context);

			expect(shortcut[action]).toHaveBeenCalledWith(context);
		});
	});

	test('handlerShortcut is not called', () => {
		config.shortcutKeys.map(({ action }) => {
			const data = { key: rndString() };
			const context = { data };

			jest.spyOn(shortcut, `${ action }`).mockReturnValue();

			shortcutManager.handleShortcut(context);

			expect(shortcut[action]).not.toHaveBeenCalledWith(context);
		});
	});
});

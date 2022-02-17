import shortcut from '../components/keyboard/shortcut';
import config from '../core/config';

const shortcutManager = {
	handleShortcut: (() => {
		const shortcutKeyMap = config.shortcutKeys
			.reduce((acc, { key, action }) => ({
				...acc,
				[key]: action,
			}), {});

		return (context) => {
			const { data: { key }} = context;
			const action = shortcutKeyMap[key.toUpperCase()] || undefined;

			action && shortcut[action](context);
		};
	})(),
};

export default shortcutManager;

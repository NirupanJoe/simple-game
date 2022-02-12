import { useEffect } from 'react';
import shortcut from './shortcut';

const Keyboard = (context) => {
	useEffect(() => {
		// eslint-disable-next-line no-undef
		window.addEventListener('keydown', (evt) => {
			const key = evt.key.toUpperCase();

			shortcut[key] && shortcut[key](context);
		});
	}, []);
};

export default Keyboard;

/* eslint-disable no-undef */
import { useEffect } from 'react';
import shortcutManager from '../../services/shortcutManager';

const Keyboard = (context) => {
	useEffect(() => {
		const handleKeydown = ({ key }) => {
			shortcutManager.handleShortcut({ ...context, data: { key }});
		};

		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [context, shortcutManager]);
};

export default Keyboard;

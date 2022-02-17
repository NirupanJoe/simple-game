import { rndString } from '@laufire/utils/random';
import { render } from '@testing-library/react';
import ShortcutKey from './shortcutKey';

test('shortcutKey', () => {
	const data = {
		key: rndString(),
		desc: rndString(),
	};

	const component = render(ShortcutKey(data)).container.children[0];

	expect(component).toBeInTheDocument();
	expect(component).toHaveClass('shortcutKey');
	expect(component.children[0]).toBeInTheDocument();
	expect(component.children[0]).toHaveClass('desc');
	expect(component.children[0]).toHaveTextContent(data.desc);
	expect(component.children[1]).toBeInTheDocument();
	expect(component.children[1]).toHaveClass('key');
	expect(component.children[1]).toHaveTextContent(data.key);
});

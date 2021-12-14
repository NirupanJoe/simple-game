import { render } from '@testing-library/react';
import ThreeDMode from './3dMode';

test('ThreeDMode', () => {
	const [component] = render(ThreeDMode()).container.children;

	expect(component).toBeInTheDocument();
	expect(component).toHaveTextContent('3D Mode');
});

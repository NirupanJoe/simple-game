/* eslint-disable react/display-name */
jest.mock('@react-three/fiber', () => ({
	Canvas: ({ children }) => <div>{children}</div>,
}));
jest.mock('./base', () => () => <div/>);

import React from 'react';
import { render } from '@testing-library/react';
import ThreeDMode from './3dMode';

test('ThreeDMode', () => {
	const context = Symbol('context');

	const [component] = render(ThreeDMode(context)).container.children;

	expect(component).toBeInTheDocument();
	expect(component.children[0]).toBeInTheDocument();
	expect(component.children[0].children[0]).toBeInTheDocument();
	expect(component.childElementCount).toBe(1);
	expect(component.children[0].childElementCount).toBe(1);
});

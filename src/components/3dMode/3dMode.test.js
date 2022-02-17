jest.mock('@react-three/fiber', () => ({
	Canvas: jest.fn(),
}));
jest.mock('./base', () => jest.fn(),);

import React from 'react';
import { render } from '@testing-library/react';
import ThreeDMode from './3dMode';
import { Canvas } from '@react-three/fiber';
import * as Help from '../help';
import * as Base from './base';

test('ThreeDMode', () => {
	const context = { data: Symbol('context') };
	const childCount = 2;

	Base.mockReturnValue(<div className="base"/>);
	Canvas.mockImplementation(({ children }) =>
		<div className="canvas">{children}</div>);
	jest.spyOn(Help, 'default').mockReturnValue(<div className="help"/>);

	const component = render(ThreeDMode(context)).container.children[0];

	expect(component).toBeInTheDocument();
	expect(component).toHaveClass('threeDMode');
	expect(component.childElementCount).toEqual(childCount);
	expect(component.children[0]).toBeInTheDocument();
	expect(component.children[0]).toHaveClass('canvas');
	expect(component.children[1]).toBeInTheDocument();
	expect(component.children[1]).toHaveClass('help');
	expect(component.children[0].children[0]).toBeInTheDocument();
	expect(component.children[0].childElementCount).toBe(1);
	expect(Canvas).toHaveBeenCalled();
	expect(Base.mock.calls[0][0]).toEqual(context);
	expect(Help.default.mock.calls[0][0]).toEqual(context);
});

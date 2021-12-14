/* eslint-disable react/display-name */
jest.mock('../healthBar', () => () => <div role="healthBar"/>);
jest.mock('../score', () => () => <div role="score"/>);
jest.mock('../flight', () => () => <div role="flight"/>);

import React from 'react';
import { render } from '@testing-library/react';
import TwoDMode from './2dMode';
import * as Container from '../container';
import Cloud from '../cloud';
import Bullet from '../bullet';
import Target from '../target';

describe('TwoDMode', () => {
	const state = {
		targets: Symbol('target'),
		bullets: Symbol('bullets'),
		objects: Symbol('objects'),
	};
	const context = { state	};

	test('render twoDMode', () => {
		jest.spyOn(Container, 'default')
			.mockReturnValueOnce(<div role="cloud"/>)
			.mockReturnValueOnce(<div role="bullet"/>)
			.mockReturnValueOnce(<div role="target"/>);

		const { getByRole } = render(TwoDMode(context));

		expect(Container.default).toHaveBeenCalledWith(state.objects, Cloud);
		expect(Container.default).toHaveBeenCalledWith(state.bullets, Bullet);
		expect(Container.default).toHaveBeenCalledWith(state.targets, Target);
		expect(getByRole('healthBar')).toBeInTheDocument();
		expect(getByRole('cloud')).toBeInTheDocument();
		expect(getByRole('score')).toBeInTheDocument();
		expect(getByRole('bullet')).toBeInTheDocument();
		expect(getByRole('flight')).toBeInTheDocument();
		expect(getByRole('target')).toBeInTheDocument();
		expect(getByRole('twoDMode')).toBeInTheDocument();
		expect(getByRole('twoDMode')).toHaveClass('twoDMode');
	});
});

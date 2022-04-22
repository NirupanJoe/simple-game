import React from 'react';
import { render } from '@testing-library/react';
import TwoDMode from './2dMode';
import * as Container from '../container';
import backgroundObject from '../backgroundObject';
import Bullet from '../bullet';
import Target from '../target';
import * as HealthBar from '../healthBar';
import * as Score from '../score';
import * as Flight from '../flight';

test('render twoDMode', () => {
	const state = {
		targets: Symbol('target'),
		bullets: Symbol('bullets'),
		objects: Symbol('objects'),
	};
	const context = { state	};

	jest.spyOn(Container, 'default')
		.mockReturnValueOnce(<div role="backgroundObject"/>)
		.mockReturnValueOnce(<div role="bullet"/>)
		.mockReturnValueOnce(<div role="target"/>);

	jest.spyOn(HealthBar, 'default')
		.mockReturnValue(<div role="healthBar"/>);

	jest.spyOn(Score, 'default').mockReturnValue(<div role="score-card"/>);

	jest.spyOn(Flight, 'default').mockReturnValue(<div role="flight"/>);

	const { getByRole } = render(TwoDMode(context));

	expect(Container.default)
		.toHaveBeenCalledWith(state.objects, backgroundObject);
	expect(Container.default).toHaveBeenCalledWith(state.bullets, Bullet);
	expect(Container.default).toHaveBeenCalledWith(state.targets, Target);
	expect(HealthBar.default).toHaveBeenCalled();
	expect(Flight.default).toHaveBeenCalled();
	expect(Score.default).toHaveBeenCalled();
	expect(getByRole('healthBar')).toBeInTheDocument();
	expect(getByRole('backgroundObject')).toBeInTheDocument();
	expect(getByRole('score-card')).toBeInTheDocument();
	expect(getByRole('bullet')).toBeInTheDocument();
	expect(getByRole('flight')).toBeInTheDocument();
	expect(getByRole('target')).toBeInTheDocument();
	expect(getByRole('twoDMode')).toBeInTheDocument();
	expect(getByRole('twoDMode')).toHaveClass('twoDMode');
});

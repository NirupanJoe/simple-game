import { React } from 'react';
import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';
import PositionService from '../../../services/positionService';
import * as getSprings from '../animation';
import * as BulletModel from '../model/bullet/index';
import Bullet from './bullets';
import { render } from '@testing-library/react';

test('Bullet', () => {
	const ten = 10;
	const ranges = range(0, rndBetween(1, ten));
	const state = {
		bullets: ranges.map(Symbol),
	};
	const context = {
		state,
	};
	const projected = Symbol('projected');
	const springs = state.bullets.map(() => Symbol('spring'));
	const enrichedBullets = state.bullets.map(() => projected);
	const bullet = <div role="bullet"/>;

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(projected);
	jest.spyOn(getSprings, 'default').mockReturnValue(springs);
	jest.spyOn(BulletModel, 'default').mockReturnValue(bullet);

	const { getAllByRole } = render(Bullet(context));

	state.bullets.forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	expect(getSprings.default).toHaveBeenCalledWith(enrichedBullets, 'bullet');

	springs.forEach((animationData, i) => {
		expect(getAllByRole('bullet')[i]).toBeInTheDocument();
		expect(BulletModel.default.mock.calls[0][0]).toMatchObject({
			...context, data: { ...enrichedBullets[i], ...animationData },
		});
	});
});

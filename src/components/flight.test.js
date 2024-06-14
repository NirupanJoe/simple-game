import Flight from './flight';
import { render } from '@testing-library/react';
import context from '../core/context';
import PositionService from '../services/positionService';
import { rndBetween } from '@laufire/utils/lib';
import { rndValue } from '@laufire/utils/random';

jest.mock('../core/context', () => ({
	state: { flight: { x: 100 }},
}));

describe('testing Flight', () => {
	test('flight is visible', () => {
		const returnValue = { x: rndBetween() };

		context.state.playPause = rndValue([true, false]);
		jest.spyOn(PositionService, 'project').mockReturnValue(returnValue);

		const component = render(Flight()).getByRole('flight');

		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('flight');
		context.state.playPause
			? expect(PositionService.project)
				.not.toBeCalledWith(context.state.flight)
			: expect(PositionService.project)
				.toBeCalledWith(context.state.flight);
		expect(component).toHaveStyle({
			left: `${ returnValue.x }%`,
		});
	});
});

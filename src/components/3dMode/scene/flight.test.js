import PositionService from '../../../services/positionService';
import * as getSprings from '../animation';
import * as FlightModel from '../model/flight';
import Flight from './flight';

test('flight', () => {
	const state = {
		flight: {
			id: 0,
		},
	};
	const viewport = Symbol('viewport');
	const context = {
		state,
		viewport,
	};
	const projected = Symbol('projected');
	const enrichedFlight = [projected];
	const flight = Symbol('flight');
	const objects = [state.flight];
	const springs = objects.map(() => Symbol('spring'));

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(projected);
	jest.spyOn(getSprings, 'default').mockReturnValue(springs);
	jest.spyOn(FlightModel, 'default').mockReturnValue(flight);

	const result = Flight(context);

	[state.flight].forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	expect(getSprings.default).toHaveBeenCalledWith(enrichedFlight, 'flight');

	springs.forEach((data) =>
		expect(FlightModel.default).toHaveBeenCalledWith({ ...context, data }));
	expect(result).toEqual([flight]);
});

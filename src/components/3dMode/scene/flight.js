import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import FlightModel from '../model/flight/index';

const Flight = (context) => {
	const { state: { flight }} = context;
	const enrichedFlight = [flight].map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedFlight, 'flight').map((data) =>
			FlightModel({ ...context, data }))
	);
};

export default Flight;

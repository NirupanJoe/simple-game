import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import CloudModel from '../model/cloud';

const Clouds = (context) => {
	const { state: { objects }} = context;
	const enrichedObjects = objects.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedObjects, 'object').map((animationData, i) =>
			CloudModel({
				...context,
				data: { ...enrichedObjects[i], ...animationData },
			}))
	);
};

export default Clouds;

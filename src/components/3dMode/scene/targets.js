import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import TargetModel from '../model/target/index';

const Targets = (context) => {
	const { state: { targets }} = context;

	const enrichedTargets = targets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedTargets, 'target').map((animationData, i) =>
			TargetModel({
				...context,
				data: {
					...enrichedTargets[i],
					...animationData,
				},
			}))
	);
};

export default Targets;

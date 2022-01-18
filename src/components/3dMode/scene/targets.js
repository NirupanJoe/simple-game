import { React } from 'react';
import PositionService from '../../../services/positionService';
import TargetModel from '../model/target/index';

const Targets = (context) => {
	const { state: { targets }} = context;
	const enrichedTargets = targets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		enrichedTargets.map((target) => {
			const data = { ...context, data: target };

			return (
				<group key={ target.id }>
					<TargetModel { ...data }/>
				</group>
			);
		})
	);
};

export default Targets;

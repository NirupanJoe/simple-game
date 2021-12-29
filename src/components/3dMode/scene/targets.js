import { useGLTF, useTexture } from '@react-three/drei';
import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import TargetModel from '../model/target';

const Target = (context) => {
	const { state: { targets }} = context;
	const { nodes, materials } = useGLTF(`${ process.env.PUBLIC_URL }/target/stacy.gltf`);
	const texture = useTexture(`${ process.env.PUBLIC_URL }/target/stacy.jpg`);
	const enrichedTargets = targets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedTargets, 'target').map((animationData, i) =>
			TargetModel({
				...context,
				data: {
					...enrichedTargets[i],
					...animationData,
					nodes,
					materials,
					texture,
				},
			}))
	);
};

export default Target;

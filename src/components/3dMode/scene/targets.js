import { useGLTF } from '@react-three/drei';
import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import TargetModel from '../model/target';

const Target = (context) => {
	const { state: { targets }} = context;
	const { scene, materials } = useGLTF(`${ process.env.PUBLIC_URL }/target/target.gltf`);
	const enrichedTargets = targets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedTargets, 'target').map((animationData, i) =>
			TargetModel({
				...context,
				data: {
					...enrichedTargets[i],
					...animationData,
					scene,
					materials,
				},
			}))
	);
};

export default Target;

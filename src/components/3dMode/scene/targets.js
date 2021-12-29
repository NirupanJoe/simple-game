import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import PositionService from '../../../services/positionService';
import getSprings from '../animation';
import TargetModel from '../model/target';

const Target = (context) => {
	const { state: { targets }} = context;
	const { scene } = useGLTF(`${ process.env.PUBLIC_URL }/target/target.gltf`);
	const clones = useMemo(() => targets.map(() =>
		SkeletonUtils.clone(scene)), [targets.length]);
	const enrichedTargets = targets.map((data) =>
		PositionService.threeDProject({ ...context, data }));

	return (
		getSprings(enrichedTargets, 'target').map((animationData, i) =>
			TargetModel({
				...context,
				data: {
					...enrichedTargets[i],
					...animationData,
					scene: clones[i],
				},
			}))
	);
};

export default Target;

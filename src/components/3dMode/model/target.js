import { React, useEffect, useMemo } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

// eslint-disable-next-line max-lines-per-function
const Model = ({ color }) => {
	const { scene, materials, animations } = useGLTF(`${ process.env.PUBLIC_URL }/target/target.gltf`);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { ref, actions } = useAnimations(animations);

	useEffect(() => actions.default.play(), []);

	return (
		<mesh
			ref={ ref }
			material={ materials.flight }
			material-color={ color }
		>
			<directionalLight intensity={ 0.8 }/>
			<primitive
				object={ clone }
				scale={ 0.8 }
			/>
			<meshStandardMaterial color={ color }/>
		</mesh>
	);
};

const Target = ({ data }) => {
	const { rotation, position, id } = data;

	return (
		<a.group
			key={ id }
			dispose={ null }
			rotation={ rotation }
			position={ position }
		>
			<Model { ...data }/>
		</a.group>);
};

export default Target;

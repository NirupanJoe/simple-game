import React from 'react';
import { a } from '@react-spring/three';
import Audio from './audio';
import { useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

const Bullet = (context) => {
	const { data: { rotation, position, id, width, height }} = context;
	const { scene } = useGLTF(`${ process.env.PUBLIC_URL }/bullet/bullet.gltf`);
	const clone = SkeletonUtils.clone(scene);

	return (
		<a.group
			key={ id }
			rotation={ rotation }
			position={ position }
			scale={ [width, height, width] }
		>
			<primitive object={ clone }/>
			<Audio { ...context }/>
		</a.group>
	);
};

export default Bullet;

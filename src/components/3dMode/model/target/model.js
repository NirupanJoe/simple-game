import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

// eslint-disable-next-line max-lines-per-function
const Model = ({ data }) => {
	const { color, position, rotation } = data;
	const group = useRef();
	const { nodes } = useGLTF(`${ process.env.PUBLIC_URL }/target/paperPlane.gltf`);

	return (
		<a.group
			ref={ group }
			scale={ 0.5 }
			position={ position }
			rotation={ rotation }
			dispose={ null }
		>
			<mesh
				castShadow={ true }
				receiveShadow={ true }
				geometry={ nodes.Plane.geometry }
				material={ nodes.Plane.material }
			>
				<a.meshStandardMaterial attach="material" color={ color }/>
			</mesh>
		</a.group>
	);
};

useGLTF.preload(`${ process.env.PUBLIC_URL }/target/paperPlane.gltf`);

export default Model;

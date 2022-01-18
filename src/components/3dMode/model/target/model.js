import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';

const Model = ({ color }) => {
	const group = useRef();
	const { nodes } = useGLTF(`${ process.env.PUBLIC_URL }/target/paperPlane.gltf`);

	return (
		<group ref={ group } scale={ 0.5 } dispose={ null }>
			<mesh
				castShadow={ true }
				receiveShadow={ true }
				geometry={ nodes.Plane.geometry }
				material={ nodes.Plane.material }
			>
				<a.meshStandardMaterial attach="material" color={ color }/>
			</mesh>
		</group>
	);
};

useGLTF.preload(`${ process.env.PUBLIC_URL }/target/paperPlane.gltf`);

export default Model;

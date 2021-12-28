import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';

const Flight = ({ data: { rotation, position }}) => {
	const { scene, animations } = useGLTF(`${ process.env.PUBLIC_URL }/flight/flight.gltf`);
	const { ref, actions } = useAnimations(animations);

	useEffect(() => actions.default.play(), []);
	return (
		<a.mesh
			key={ 0 }
			ref={ ref }
			rotation={ rotation }
			position={ position }
		>
			<primitive object={ scene } scale={ 0.8 }/>
		</a.mesh>
	);
};

export default Flight;

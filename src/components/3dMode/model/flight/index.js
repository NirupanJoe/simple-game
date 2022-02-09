import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';
import Audio from './audio';

const Flight = (context) => {
	const { data: { rotation, position }} = context;
	const { scene, animations } = useGLTF(`${ process.env.PUBLIC_URL }/flight/flight.gltf`);
	const { ref, actions } = useAnimations(animations);

	useEffect(() => actions.default.play(), []);
	return (
		<a.group
			key={ 0 }
			ref={ ref }
			rotation={ rotation }
			position={ position }
		>
			<primitive
				object={ scene }
				scale={ 0.8 }
			/>
			<Audio { ...context }/>
		</a.group>
	);
};

export default Flight;

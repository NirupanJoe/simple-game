import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';

const Flight = ({ data: { rotation, position }}) => {
	const { scene, animations } = useGLTF(`${ process.env.PUBLIC_URL }/flight/flight.gltf`);
	const { ref, actions } = useAnimations(animations);

	useEffect(() => actions.default.play(), []);
	return (
		<group key={ 0 }>
			<a.primitive
				ref={ ref }
				object={ scene }
				scale={ 0.8 }
				rotation={ rotation }
				position={ position }
			/>
		</group>
	);
};

export default Flight;

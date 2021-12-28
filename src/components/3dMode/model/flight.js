/* eslint-disable no-magic-numbers */
import React, { useEffect } from 'react';
import { a } from '@react-spring/three';
import { useAnimations, useGLTF } from '@react-three/drei';

// eslint-disable-next-line max-lines-per-function
const Flight = ({ data: { rotation, position }}) => {
	const { scene, animations } = useGLTF(`${ process.env.PUBLIC_URL }/flight/flight.gltf`);
	const { scene: sceneOne, animations: animationsOne } = useGLTF(`${ process.env.PUBLIC_URL }/flight/flight.gltf?1`);
	const { ref, actions } = useAnimations(animations);
	const { ref: refOne, actions: actionsOne } = useAnimations(animationsOne);

	useEffect(() => actions.default.play(), []);
	useEffect(() => actionsOne.default.play(), []);
	return (
		<>
			<group>
				<a.primitive
					key={ 0 }
					ref={ ref }
					object={ scene }
					scale={ 0.8 }
					rotation={ rotation }
					position={ [0, 0, 0] }
				/>
			</group>
			<group>
				<a.primitive
					ref={ refOne }
					object={ sceneOne }
					scale={ 0.8 }
					position={ position }
				/>
			</group>
		</>
	);
};

export default Flight;

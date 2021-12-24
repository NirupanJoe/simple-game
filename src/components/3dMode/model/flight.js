import React from 'react';
import { a } from '@react-spring/three';
import { Cone } from '@react-three/drei';

const radius = 0.35;
const height = 2;
const radialSegments = 8;

const Flight = ({ data: { rotation, position, color }}) =>
	<a.mesh
		key={ 0 }
		rotation={ rotation }
		position={ position }
	>
		<Cone args={ [radius, height, radialSegments] } scale={ 0.5 }>
			<a.meshStandardMaterial color={ color }/>
		</Cone>
	</a.mesh>;

export default Flight;

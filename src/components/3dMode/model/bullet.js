import React from 'react';
import { a } from '@react-spring/three';
import { Cone } from '@react-three/drei';

const radius = 0.15;
const height = 0.6;
const radialSegments = 8;

const bullet = ({ data: { rotation, position, color, id }}) =>
	<a.mesh
		key={ id }
		rotation={ rotation }
		position={ position }
	>
		<Cone args={ [radius, height, radialSegments] } scale={ 0.5 }>
			<a.meshStandardMaterial color={ color }/>
		</Cone>
	</a.mesh>;

export default bullet;

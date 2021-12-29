import { React } from 'react';
import { a } from '@react-spring/three';

const Target = ({ data:
	// eslint-disable-next-line arrow-body-style
	{ rotation, position, color, id, scene, materials }}) => {
	return (
		<a.mesh
			key={ id }
			rotation={ rotation }
			position={ position }
		>
			<directionalLight intensity={ 0.8 }/>
			<a.primitive
				object={ scene }
				scale={ 0.8 }
				material={ materials.flight }
				material-color={ color }
			/>
		</a.mesh>
	);
};

export default Target;

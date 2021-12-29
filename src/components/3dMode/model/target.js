import { React } from 'react';
import { a } from '@react-spring/three';

const Target = ({ data: { rotation, position, id, scene }}) =>
	<a.group
		key={ id }
		dispose={ null }
		rotation={ rotation }
		position={ position }
	>
		<directionalLight intensity={ 0.8 }/>
		<primitive
			object={ scene }
			scale={ 0.8 }
		/>
	</a.group>;

export default Target;

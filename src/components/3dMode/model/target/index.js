import { React } from 'react';
import { a } from '@react-spring/three';
import Model from './model';

const Target = ({ data }) => {
	const { id, position, rotation } = data;

	return (
		<a.group
			key={ id }
			position={ position }
			rotation={ rotation }
		>
			<Model { ...data }/>
		</a.group>);
};

export default Target;

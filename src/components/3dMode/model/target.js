import { React } from 'react';
import { a } from '@react-spring/three';
import Stacy from './stacy';

// eslint-disable-next-line max-lines-per-function
const Target = ({ data }) => {
	const { rotation, position, id } = data;

	return (
		<a.group
			key={ id }
			rotation={ rotation }
			position={ position }
		>
			<Stacy { ...data }/>
		</a.group>
	);
};

export default Target;

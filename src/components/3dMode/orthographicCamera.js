import { React } from 'react';
import { OrthographicCamera as Camera } from '@react-three/drei';

const two = 2;

const OrthographicCamera = ({ viewport: { width, aspect }}) => {
	const height = width / aspect;
	const args = {
		left: -aspect * height / two,
		right: aspect * height / two,
		top: height / two,
		bottom: -height / two,
		near: -100,
		far: 100,
	};

	return (
		<Camera
			makeDefault="true"
			position={ [0, 1, 0] }
			{ ...args }
		/>
	);
};

export default OrthographicCamera;

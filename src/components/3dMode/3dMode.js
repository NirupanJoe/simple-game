import { React } from 'react';
import { Canvas } from '@react-three/fiber';
import Base from './base';

const ThreeDMode = (context) =>
	<div
		className="threeDMode"
	>
		<Canvas>
			<Base { ...context }/>
		</Canvas>
	</div>;

export default ThreeDMode;

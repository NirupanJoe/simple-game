import { React } from 'react';
import { Canvas } from '@react-three/fiber';
import Base from './base';
import Help from '../help';

const ThreeDMode = (context) =>
	<div
		className="threeDMode"
	>
		<Canvas>
			<Base { ...context }/>
		</Canvas>
		<Help { ...context }/>
	</div>;

export default ThreeDMode;

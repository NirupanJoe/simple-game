import { OrbitControls, useHelper } from '@react-three/drei';
import { React, Suspense, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Target from './scene/targets';
import Flight from './scene/flight';
import Bullets from './scene/bullets';
import Clouds from './scene/clouds';
import { DirectionalLightHelper } from 'three';
import OrthographicCamera from './orthographicCamera';

const x = 2.5;
const y = 50;
const z = 1.5;
// eslint-disable-next-line max-lines-per-function
const Base = (context) => {
	const { viewport, mouse } = useThree();
	const enrichedContext = { ...context, viewport, mouse };
	const ref = useRef();

	useHelper(
		ref, DirectionalLightHelper, 1
	);

	return (
		<>
			<color attach="background" args={ ['lightblue'] }/>
			<ambientLight color="white" intensity={ 0.3 }/>
			<directionalLight
				ref={ ref }
				position={ [x, y, z] }
				intensity={ 2 }
			/>
			<OrthographicCamera { ...enrichedContext }/>
			<Suspense fallback={ null }>
				<Target { ...enrichedContext }/>
				<Flight { ...enrichedContext }/>
				<Bullets { ...enrichedContext }/>
				<Clouds { ...enrichedContext }/>
			</Suspense>
			<OrbitControls/>
		</>
	);
};

export default Base;

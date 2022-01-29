import { OrbitControls, useHelper } from '@react-three/drei';
import { React, Suspense, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Targets from './scene/targets';
import Flight from './scene/flight';
import Bullets from './scene/bullets';
import { DirectionalLightHelper } from 'three';
import OrthographicCamera from './orthographicCamera';
import Plane from './plane';
import ContactShadows from './contactShadows';
import Bgm from './bgm';

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
				intensity={ 1 }
			/>
			<Suspense fallback={ null }>
				<Targets { ...enrichedContext }/>
				<Flight { ...enrichedContext }/>
				<Bullets { ...enrichedContext }/>
				<Plane { ...enrichedContext }/>
				<Bgm { ...enrichedContext }/>
			</Suspense>
			<OrthographicCamera { ...enrichedContext }/>
			<ContactShadows/>
			<OrbitControls/>
		</>
	);
};

export default Base;

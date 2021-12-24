import React from 'react';
import { useThree } from '@react-three/fiber';
import Target from './scene/targets';
import Flight from './scene/flight';

const x = 1;
const y = 2;
const z = 10;
const Base = (context) => {
	const { viewport, mouse } = useThree();
	const enrichedContext = { ...context, viewport, mouse };

	return (
		<>
			<color attach="background" args={ ['lightblue'] }/>
			<ambientLight color="black" intensity={ 0.3 }/>
			<directionalLight position={ [-x, y, z] } intensity={ 2 }/>
			<mesh>
				<Target { ...enrichedContext }/>
				<Flight { ...enrichedContext }/>
			</mesh>
		</>
	);
};

export default Base;

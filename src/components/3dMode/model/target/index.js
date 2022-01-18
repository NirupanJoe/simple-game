import { React } from 'react';
import { useSpring } from '@react-spring/three';
import Model from './model';
import animation from '../../animation/animation';

const Target = (context) => {
	const { data } = context;
	const spring = useSpring(animation.target(data));
	const enrichedContext = { ...context, data: { ...data, ...spring }};

	return (
		<Model { ...enrichedContext }/>
	);
};

export default Target;

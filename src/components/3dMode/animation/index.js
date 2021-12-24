import { useSprings } from '@react-spring/three';
import animation from './animation';

const getSprings = (objects, data) =>
	useSprings(objects.length, objects.map(animation[data]));

export default getSprings;

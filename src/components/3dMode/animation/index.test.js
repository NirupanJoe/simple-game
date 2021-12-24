jest.mock('@react-spring/three', () => ({
	useSprings: jest.fn(),
}));

import { range } from '@laufire/utils/collection';
import { rndBetween, rndValue } from '@laufire/utils/random';
import ReactSpring from '@react-spring/three';
import getSprings from '.';
import animation from './animation';

test('getSpring', () => {
	const ten = 10;
	const object = range(0, rndBetween(1, ten));
	const data = rndValue(['flight', 'target', 'bullet']);
	const animationData = Symbol('animationData');
	const springs = Symbol('springs');

	jest.spyOn(object, 'map').mockReturnValue(animationData);
	jest.spyOn(ReactSpring, 'useSprings').mockReturnValue(springs);

	const result = getSprings(object, data);

	expect(object.map).toHaveBeenCalledWith(animation[data]);
	expect(ReactSpring.useSprings)
		.toHaveBeenCalledWith(object.length, animationData);
	expect(result).toEqual(springs);
});

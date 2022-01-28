jest.mock('@react-spring/three', () => ({
	useSpring: jest.fn(),
}));

import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import Target from './index';
import helper from '../../../../testHelper/helper';
import * as Model from './model';
import * as spring from '@react-spring/three';
import animation from '../../animation/animation';

test('Target', async () => {
	const data = Symbol('data');
	const props = { scale: rndBetween() };
	const getAnimation = Symbol('getAnimation');
	const getSpring = Symbol('getSpring');

	jest.spyOn(animation, 'target').mockReturnValue(getAnimation);
	jest.spyOn(spring, 'useSpring').mockReturnValue(getSpring);
	jest.spyOn(Model, 'default').mockReturnValue(<mesh { ...props }/>);

	const scene = await helper.getScene(<Target data={ data }/>);
	const mesh = scene.allChildren;

	expect(mesh.length).toBe(1);
	expect(mesh[0].props).toEqual(props);
	expect(animation.target).toHaveBeenCalledWith(data);
	expect(spring.useSpring).toHaveBeenCalledWith(getAnimation);
});

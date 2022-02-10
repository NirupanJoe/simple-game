import React from 'react';
import { rndBetween, rndString } from '@laufire/utils/random';
import Bullet from '.';
import helper from '../../../../testHelper/helper';
import * as Audio from './audio';
import * as ReactDrei from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

test('Bullet', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
		width: rndString(),
		height: rndString(),
	};
	const context = { data };
	const model = Symbol('model');
	const clone = { scene: Symbol('scene') };
	const audioScale = rndBetween();
	const primitiveProps = { object: clone };
	const childCount = 2;

	jest.spyOn(ReactDrei, 'useGLTF').mockReturnValue(model);
	jest.spyOn(SkeletonUtils, 'clone').mockReturnValue(clone);
	jest.spyOn(Audio, 'default').mockReturnValue(<mesh scale={ audioScale }/>);

	const scene = await helper.getScene(<Bullet { ...context }/>);
	const mesh = scene.children[0].allChildren;

	expect(mesh.length).toBe(childCount);
	expect(mesh[0].props.scale).toEqual(audioScale);
	expect(mesh[1].props).toMatchObject(primitiveProps);
	expect(Audio.default.mock.calls[0][0]).toMatchObject(context);
});

import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import Bullet from '.';
import helper from '../../../../testHelper/helper';
import * as Audio from './audio';

test('Bullet', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
		color: 'red',
	};
	const scale = 0.5;
	const audioScale = rndBetween();
	const childCount = 2;

	jest.spyOn(Audio, 'default').mockReturnValue(<mesh scale={ audioScale }/>);
	const scene = await helper.getScene(<Bullet data={ data }/>);
	const mesh = scene.children[0].allChildren;

	expect(mesh.length).toBe(childCount);
	expect(mesh[0].props.scale).toEqual(scale);
	expect(mesh[1].props.scale).toEqual(audioScale);
});

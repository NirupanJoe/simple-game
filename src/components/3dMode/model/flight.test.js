import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import Flight from './flight';
import helper from '../../../testHelper/helper';

test('Flight', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
		color: 'red',
	};
	const scale = 0.5;

	const scene = await helper.getScene(<Flight data={ data }/>);
	const mesh = scene.children[0].allChildren;

	expect(mesh.length).toBe(1);
	expect(mesh[0].props.scale).toEqual(scale);
});

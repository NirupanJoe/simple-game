import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import Target from './target';
import helper from '../../../testHelper/helper';

test('Target', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
		color: 'red',
	};
	const scale = 0.5;

	const scene = await helper.getScene(<Target data={ data }/>);
	const mesh = scene.children[0].allChildren;

	expect(mesh.length).toBe(1);
	expect(mesh[0].props.scale).toEqual(scale);
});

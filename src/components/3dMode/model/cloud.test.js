import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import Cloud from './cloud';
import helper from '../../../testHelper/helper';
import * as ReactDrei from '@react-three/drei';

test('Cloud', async () => {
	const data = {
		x: rndBetween(),
		y: rndBetween(),
		width: rndBetween(),
	};
	const childLength = 1;
	const scale = 0.3;
	const position = [data.x, data.y, 0];

	jest.spyOn(ReactDrei, 'Cloud').mockReturnValue(<mesh scale={ scale }/>);
	const scene = await helper.getScene(<Cloud data={ data }/>);
	const mesh = scene.children;

	expect(mesh.length).toBe(childLength);
	expect(mesh[0].props.position).toEqual(position);
	expect(mesh[0].children[0].props.scale).toEqual(scale);
});

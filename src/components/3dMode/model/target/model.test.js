import { React } from 'react';
import { rndBetween } from '@laufire/utils/random';
import helper from '../../../../testHelper/helper';
import Model from './model';
import * as ReactDrei from '@react-three/drei';

test('Target Model', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
		color: 'red',
	};
	const nodes = {
		Plane: {
			geometry: Symbol('geometry'),
			material: Symbol('material'),
		},
	};
	const childCount = 1;
	const props = {
		...nodes.Plane,
	};

	jest.spyOn(ReactDrei, 'useGLTF').mockReturnValue({ nodes });

	const scene = await helper.getScene(<Model data={ data }/>);

	const mesh = scene.allChildren;

	expect(mesh.length).toEqual(childCount);
	expect(mesh[0].allChildren[0].props).toMatchObject(props);
});

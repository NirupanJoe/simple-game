import React from 'react';
import * as ReactFiber from '@react-three/fiber';
import Base from './base';
import helper from '../../testHelper/helper';
import * as Target from './scene/targets';
import { rndBetween } from '@laufire/utils/random';
import { range } from '@laufire/utils/collection';

test('base', async () => {
	const x = 1;
	const y = 2;
	const z = 10;
	const context = { context: Symbol('context') };
	const useThree = {
		mouse: Symbol('mouse'),
		viewport: Symbol('viewport'),
	};
	const { mouse, viewport } = useThree;
	const enrichedContext = { ...context, mouse, viewport };
	const childCount = 3;
	const meshChildCount = 1;
	const three = 3;
	const ranges = range(0, three);
	const targetPosition = ranges.map(() => rndBetween());
	const targetMesh = <mesh position={ targetPosition }/>;
	const ambientLightProps = {
		color: 'black',
		intensity: 0.3,
	};
	const directionalLightProps = {
		position: [-x, y, z],
		intensity: 2,
	};

	jest.spyOn(ReactFiber, 'useThree').mockReturnValue(useThree);
	jest.spyOn(Target, 'default').mockReturnValue(targetMesh);

	const scene = await helper.getScene(<Base { ...context }/>);
	const mesh = scene.children[2].allChildren;

	expect(ReactFiber.useThree).toHaveBeenCalledWith();
	expect(scene.children.length).toBe(childCount);
	expect(scene.children[0].props).toMatchObject(ambientLightProps);
	expect(scene.children[1].props).toMatchObject(directionalLightProps);
	expect(mesh.length).toBe(meshChildCount);
	expect(Target.default.mock.calls[0][0]).toEqual(enrichedContext);
	expect(mesh[0].props.position).toBe(targetPosition);
});

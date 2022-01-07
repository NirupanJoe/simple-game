import React from 'react';
import * as ReactFiber from '@react-three/fiber';
import Base from './base';
import { rndBetween } from '@laufire/utils/random';
import { range } from '@laufire/utils/collection';
import helper from '../../testHelper/helper';
import * as Target from './scene/targets';
import * as Flight from './scene/flight';
import * as Bullet from './scene/bullets';
import * as Clouds from './scene/clouds';

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
	const childCount = 7;
	const three = 3;
	const ranges = range(0, three);
	const targetPosition = ranges.map(() => rndBetween());
	const flightPosition = ranges.map(() => rndBetween());
	const bulletPosition = ranges.map(() => rndBetween());
	const cloudPosition = ranges.map(() => rndBetween());
	const targetMesh = <mesh position={ targetPosition }/>;
	const flightMesh = <mesh position={ flightPosition }/>;
	const bulletMesh = <mesh position={ bulletPosition }/>;
	const CloudMesh = <mesh position={ cloudPosition }/>;
	const ambientLightProps = {
		color: 'black',
		intensity: 0.3,
	};
	const directionalLightProps = {
		position: [-x, y, z],
		intensity: 2,
	};
	const colorProps = {
		attach: 'background',
		args: ['lightblue'],
	};

	jest.spyOn(ReactFiber, 'useThree').mockReturnValue(useThree);
	jest.spyOn(Target, 'default').mockReturnValue(targetMesh);
	jest.spyOn(Flight, 'default').mockReturnValue(flightMesh);
	jest.spyOn(Bullet, 'default').mockReturnValue(bulletMesh);
	jest.spyOn(Clouds, 'default').mockReturnValue(CloudMesh);

	const scene = await helper.getScene(<Base { ...context }/>);
	const children = scene.allChildren;

	expect(ReactFiber.useThree).toHaveBeenCalledWith();
	expect(children.length).toBe(childCount);
	expect(children[0].props).toMatchObject(ambientLightProps);
	expect(children[1].props).toMatchObject(directionalLightProps);
	expect(children[2].props.position).toBe(targetPosition);
	expect(children[3].props.position).toBe(flightPosition);
	expect(children[4].props.position).toBe(bulletPosition);
	expect(children[5].props.position).toBe(cloudPosition);
	expect(children[6].props).toMatchObject(colorProps);
	expect(Target.default.mock.calls[0][0]).toEqual(enrichedContext);
	expect(Flight.default.mock.calls[0][0]).toEqual(enrichedContext);
	expect(Bullet.default.mock.calls[0][0]).toEqual(enrichedContext);
	expect(Clouds.default.mock.calls[0][0]).toEqual(enrichedContext);
});

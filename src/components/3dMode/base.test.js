import React from 'react';
import * as ReactFiber from '@react-three/fiber';
import Base from './base';
import { rndBetween } from '@laufire/utils/random';
import helper from '../../testHelper/helper';
import * as Targets from './scene/targets';
import * as Flight from './scene/flight';
import * as Bullets from './scene/bullets';
import * as Plane from './plane';
import * as OrthographicCamera from './orthographicCamera';
import * as Bgm from './bgm';
import * as ContactShadows from './contactShadows';
import * as ReactDrei from '@react-three/drei';

test('Base', async () => {
	const context = { context: Symbol('context') };
	const useThree = {
		mouse: Symbol('mouse'),
		viewport: Symbol('viewport'),
	};
	const { mouse, viewport } = useThree;
	const enrichedContext = { ...context, mouse, viewport };
	const orbitControlsScale = rndBetween();
	const childCount = 11;
	const two = 2;
	const components = [
		[Targets, rndBetween()],
		[Flight, rndBetween()],
		[Bullets, rndBetween()],
		[Plane, rndBetween()],
		[Bgm, rndBetween()],
		[OrthographicCamera, rndBetween()],
		[ContactShadows, rndBetween(), {}],
	];

	jest.spyOn(ReactFiber, 'useThree').mockReturnValue(useThree);
	jest.spyOn(ReactDrei, 'useHelper').mockReturnValue();
	jest.spyOn(ReactDrei.OrbitControls, 'render')
		.mockReturnValue(<mesh scale={ orbitControlsScale }/>);

	components.map(([component, scale]) => {
		const componentMesh = <mesh scale={ scale }/>;

		jest.spyOn(component, 'default').mockReturnValue(componentMesh);
	});

	const scene = await helper.getScene(<Base { ...context }/>);
	const children = scene.allChildren;

	expect(ReactFiber.useThree).toHaveBeenCalledWith();
	expect(children.length).toBe(childCount);
	components.map(([component, scale, props = enrichedContext], i) => {
		expect(children[i + two].props.scale).toEqual(scale);
		expect(component.default.mock.calls[0][0]).toEqual(props);
	});
});

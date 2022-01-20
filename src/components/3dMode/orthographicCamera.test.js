import { rndBetween } from '@laufire/utils/lib';
import { React } from 'react';
import helper from '../../testHelper/helper';
import OrthographicCamera from './orthographicCamera';

const two = 2;

test.only('OrthographicCamera', async () => {
	const width = rndBetween();
	const aspect = rndBetween();
	const height = width / aspect;
	const data = { viewport: { width, aspect }};
	const props = {
		left: -aspect * height / two,
		right: aspect * height / two,
		top: height / two,
		bottom: -height / two,
		near: -100,
		far: 100,
		position: [0, 1, 0],
	};
	const componentCount = 1;

	const scene = await helper.getScene(<OrthographicCamera { ...data }/>);

	const component = scene.allChildren;

	expect(component.length).toBe(componentCount);
	expect(component[0].props).toEqual(props);
	expect(component[0].type).toEqual('OrthographicCamera');
});

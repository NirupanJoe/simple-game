import React from 'react';
import { rndBetween } from '@laufire/utils/random';
import * as ReactDrei from '@react-three/drei';
import Flight from '.';
import helper from '../../../../testHelper/helper';
import * as Audio from './audio';

test('Flight', async () => {
	const data = {
		rotation: rndBetween(),
		position: rndBetween(),
	};
	const scale = 0.8;
	const model = {
		scene: {
			__r3f: Symbol('r3f'),
		},
		animations: Symbol('animations'),
	};
	const play = jest.fn();
	const animations = {
		actions: {
			default: {
				play,
			},
		},
	};
	const childCount = 2;
	const audioScale = rndBetween();
	const getAudio = <mesh scale={ audioScale }/>;

	jest.spyOn(ReactDrei, 'useGLTF').mockReturnValue(model);
	jest.spyOn(ReactDrei, 'useAnimations').mockReturnValue(animations);
	jest.spyOn(Audio, 'default').mockReturnValue(getAudio);
	jest.spyOn(React, 'useEffect');

	const scene = await helper.getScene(<Flight data={ data }/>);
	const mesh = scene.children[0].allChildren;

	expect(mesh.length).toBe(childCount);
	expect(mesh[1].props.scale).toEqual(scale);
	expect(mesh[0].props.scale).toEqual(audioScale);
	expect(ReactDrei.useGLTF).toHaveBeenCalledWith(`${ process.env.PUBLIC_URL }/flight/flight.gltf`);
	expect(ReactDrei.useAnimations).toHaveBeenCalledWith(model.animations);
	expect(Audio.default).toHaveBeenCalled();
	helper.testEffect(play, 1);
});

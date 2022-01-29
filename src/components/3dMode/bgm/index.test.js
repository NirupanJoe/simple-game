import { rndBetween } from '@laufire/utils/random';
import { PositionalAudio } from '@react-three/drei';
import { React } from 'react';
import Bgm from '.';
import helper from '../../../testHelper/helper';

test('BGM', async () => {
	const props = { scale: rndBetween() };

	jest.spyOn(PositionalAudio, 'render').mockReturnValue(<mesh { ...props }/>);

	const scene = await helper.getScene(<Bgm/>);

	const mesh = scene.allChildren;

	expect(mesh.length).toEqual(1);
	expect(mesh[0].props).toMatchObject(props);
});

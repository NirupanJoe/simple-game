import { rndBetween } from '@laufire/utils/random';
import { React } from 'react';
import Bgm from '.';
import helper from '../../../testHelper/helper';
import * as AudioClip from '../audioClip';

test('BGM', async () => {
	const props = { scale: rndBetween() };
	const context = { props: Symbol('props') };

	jest.spyOn(AudioClip, 'default').mockReturnValue(<mesh { ...props }/>);

	const scene = await helper.getScene(<Bgm { ...context }/>);

	const mesh = scene.allChildren;

	expect(mesh.length).toEqual(1);
	expect(mesh[0].props).toMatchObject(props);
	expect(AudioClip.default.mock.calls[0][0]).toMatchObject(context);
});

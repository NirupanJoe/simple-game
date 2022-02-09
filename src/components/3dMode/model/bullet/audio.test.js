import { rndBetween } from '@laufire/utils/random';
import { React } from 'react';
import helper from '../../../../testHelper/helper';
import * as AudioClip from '../../audioClip';
import Audio from './audio';

test('Bullet Audio', async () => {
	const context = { props: Symbol('props') };
	const props = { scale: rndBetween() };

	jest.spyOn(AudioClip, 'default')
		.mockReturnValue(<mesh { ...props }/>);

	const scene = await helper.getScene(<Audio { ...context }/>);

	const mesh = scene.allChildren;

	expect(mesh.length).toEqual(1);
	expect(mesh[0].props).toMatchObject(props);
	expect(AudioClip.default.mock.calls[0][0]).toMatchObject(context);
});

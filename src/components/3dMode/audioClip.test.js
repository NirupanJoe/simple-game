import { React } from 'react';
import helper from '../../testHelper/helper';
import AudioClip from './audioClip';
import { PositionalAudio } from '@react-three/drei';

describe('AudioClip', () => {
	const expectations = [
		['', true],
		['does not', false],
	];

	test.each(expectations)('AudioClip %p render when %p',
		async (dummy, audio) => {
			const state = { audio };
			const data = {
				props: Symbol('props'),
			};
			const context = { state, data };
			const childCount = {
				true: 1,
				false: 0,
			};

			jest.spyOn(PositionalAudio, 'render').mockReturnValue(<mesh/>);

			const scene = await helper.getScene(<AudioClip { ...context }/>);
			const mesh = scene.allChildren;

			expect(mesh.length).toEqual(childCount[state.audio]);
			state.audio
		&& expect(PositionalAudio.render.mock.calls[0][0]).toMatchObject(data);
		});
});

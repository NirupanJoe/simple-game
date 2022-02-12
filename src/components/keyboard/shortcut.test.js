import { rndValue } from '@laufire/utils/random';
import shortcut from './shortcut';

describe('shortcut', () => {
	test('mute', () => {
		const actions = { setAudio: jest.fn() };
		const state = { audio: rndValue([true, false]) };
		const context = { state, actions };

		shortcut.M(context);

		expect(actions.setAudio).toHaveBeenCalledWith(!state.audio);
	});
});

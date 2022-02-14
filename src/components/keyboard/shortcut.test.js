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

	test('gameStart', () => {
		[false].map((ready) => {
			const actions = { gameStart: jest.fn() };
			const state = { ready };
			const context = { actions, state };

			shortcut.ENTER(context);

			const called = {
				true: 'not.toHaveBeenCalledWith',
				false: 'toHaveBeenCalledWith',
			};

			expect(actions.gameStart)[called[ready]](!ready);
		});
	});
});

import { rndValue } from '@laufire/utils/random';
import shortcut from './shortcut';

describe('shortcut', () => {
	test('mute', () => {
		const actions = { setAudio: jest.fn() };
		const state = { audio: rndValue([true, false]) };
		const context = { state, actions };

		shortcut.mute(context);

		expect(actions.setAudio).toHaveBeenCalledWith(!state.audio);
	});

	test('gameStart', () => {
		[false, true].map((ready) => {
			const actions = { gameStart: jest.fn() };
			const state = { ready };
			const context = { actions, state };

			shortcut.gameStart(context);

			!ready
				? expect(actions.gameStart).toHaveBeenCalledWith(!ready)
				: expect(actions.gameStart).not.toHaveBeenCalledWith(!ready);
		});
	});

	test('help', () => {
		const actions = { setHelp: jest.fn(), setPlayPause: jest.fn() };
		const state = {
			help: rndValue([true, false]),
			playPause: rndValue([true, false]),
		};
		const context = { state, actions };

		shortcut.help(context);

		expect(actions.setHelp).toHaveBeenCalledWith(!state.help);
		expect(actions.setPlayPause).toHaveBeenCalledWith(!state.playPause);
	});

	test('playPause', () => {
		const actions = { setPlayPause: jest.fn() };
		const state = { playPause: rndValue([true, false]) };
		const context = { state, actions };

		shortcut.playPause(context);

		expect(actions.setPlayPause).toHaveBeenCalledWith(!state.playPause);
	});
});

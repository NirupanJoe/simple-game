/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import actions from '../../core/actions';
import context from '../../core/context';
import MasterLoop from './masterLoop';
const state = { playPause: false };

jest.mock('../../core/context', () => ({ state }));

describe('masterLoop', () => {
	context.actions = actions;
	test('masterLoop', () => {
		MasterLoop.masterLoop.forEach((item) => {
			jest.spyOn(actions, item)
				.mockReturnValue();
		});
		MasterLoop.runMasterLoop();

		MasterLoop.masterLoop.forEach((item) => {
			expect(actions[item])
				.toHaveBeenCalled();
		});
	});
	test('masterLoop stoped', () => {
		context.state.playPause = true;
		MasterLoop.masterLoop.forEach((item) => {
			jest.spyOn(actions, item)
				.mockReturnValue();
		});
		MasterLoop.runMasterLoop();

		MasterLoop.masterLoop.forEach((item) => {
			expect(actions[item]).not.toHaveBeenCalledWith();
		});
	});
});

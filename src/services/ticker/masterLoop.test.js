/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import actions from '../../core/actions';
import MasterLoop from './masterLoop';

describe('masterLoop', () => {
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
});

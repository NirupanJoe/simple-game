/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import Actions from '../../core/actions';
import MasterLoop from './masterLoop';

describe('masterLoop', () => {
	test('masterLoop', () => {
		MasterLoop.masterLoop.forEach((item) => {
			jest.spyOn(Actions, item)
				.mockReturnValue();
		});
		MasterLoop.runMasterLoop();

		MasterLoop.masterLoop.forEach((item) => {
			expect(Actions[item])
				.toHaveBeenCalled();
		});
	});
});

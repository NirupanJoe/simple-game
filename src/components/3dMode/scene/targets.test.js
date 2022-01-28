import { React } from 'react';
import { range } from '@laufire/utils/collection';
import { rndBetween, rndString } from '@laufire/utils/random';
import PositionService from '../../../services/positionService';
import helper from '../../../testHelper/helper';
import * as TargetModel from '../model/target';
import Targets from './targets';

test('Target', async () => {
	const ten = 10;
	const ranges = range(0, rndBetween(1, ten));
	const state = {
		targets: ranges.map(() => ({
			id: rndString(),
		})),
	};
	const context = {
		state,
	};
	const enrichedTargets = state.targets;
	const scale = rndBetween();

	jest.spyOn(PositionService, 'threeDProject')
		.mockImplementation(({ data }) => data);
	jest.spyOn(TargetModel, 'default').mockImplementation((target) =>
		<mesh key={ target.data.id } scale={ scale }/>);

	const result = await helper.getScene(<Targets { ...context }/>);

	state.targets.forEach((data) =>
		expect(PositionService.threeDProject)
			.toHaveBeenCalledWith({ ...context, data }));

	enrichedTargets.forEach((target, i) => {
		const renderCount = 2;
		const data = { ...context, data: target };

		expect(TargetModel.default.mock.calls[i * renderCount][0])
			.toEqual(data);
	});

	expect(result.allChildren.length).toEqual(enrichedTargets.length);
});

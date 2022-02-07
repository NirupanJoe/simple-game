import { rndBetween } from '@laufire/utils/random';
import { React } from 'react';
import PositionService from '../../services/positionService';
import * as helperService from '../../services/helperService';
import helper from '../../testHelper/helper';
import Score from './score';

test('Score', async () => {
	const state = { score: rndBetween() };
	const config = { scorePosition: Symbol('scorePosition') };
	const context = { state, config };
	const getProject = {
		x: Symbol('x'),
		z: Symbol('z'),
	};
	const getDegreeToRad = rndBetween();
	const degree = -90;
	const childCount = 1;
	const meshProps = {
		rotation: [getDegreeToRad, 0, 0],
		position: [getProject.x, 1, getProject.z],
	};
	const textProps = { text: `Score: ${ state.score }` };

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(getProject);
	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);

	const scene = await helper.getScene(<Score { ...context }/>);
	const mesh = scene.allChildren[0];

	expect(mesh.allChildren.length).toEqual(childCount);
	expect(mesh.props).toMatchObject(meshProps);
	expect(mesh.allChildren[0].props).toMatchObject(textProps);
	expect(PositionService.threeDProject).toHaveBeenCalledWith({ ...context,
		data: config.scorePosition });
	expect(helperService.degreeToRad).toHaveBeenCalledWith(degree);
});

import { rndBetween, rndValue } from '@laufire/utils/random';
import React from 'react';
import * as helperService from '../../services/helperService';
import PositionService from '../../services/positionService';
import helper from '../../testHelper/helper';
import PlayPause from './playPause';

test('PlayPause', async () => {
	const config = { playPause: Symbol('playPause') };
	const actions = { setPlayPause: jest.fn() };
	const state = { playPause: rndValue([true, false]) };
	const context = { state, actions, config };
	const project = {
		x: Symbol('x'),
		z: Symbol('z'),
	};
	const getDegreeToRad = rndBetween();
	const groupProps = {
		'rotation-x': getDegreeToRad,
		'position': [project.x, 1, project.z],
	};
	const textProps = {
		text: '\u23ef',
		color: 'black',
	};
	const childCount = 1;

	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);
	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(project);

	const scene = await helper.getScene(<PlayPause { ...context }/>);
	const fireEvent = await helper.getFireEvent(<PlayPause { ...context }/>);
	const group = scene.allChildren[0];

	expect(group.allChildren.length).toEqual(childCount);
	expect(group.props).toMatchObject(groupProps);
	expect(group.children[0].props).toMatchObject(textProps);
	expect(PositionService.threeDProject).toHaveBeenCalledWith({ ...context,
		data: config.playPause });
	expect(helperService.degreeToRad).toHaveBeenCalled();

	await fireEvent(group, 'click');
	expect(actions.setPlayPause).toHaveBeenCalledWith(!state.playPause);
});

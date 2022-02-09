import { rndBetween, rndValue } from '@laufire/utils/random';
import { React } from 'react';
import helper from '../../testHelper/helper';
import AudioControl from './audioControl';
import config from '../../core/config';
import * as ReactDrei from '@react-three/drei';
import PositionService from '../../services/positionService';
import * as helperService from '../../services/helperService';

describe('AudioControl', () => {
	const state = { audio: rndValue([true, false]) };
	const actions = { setAudio: jest.fn() };
	const context = { state, actions, config };
	const texture = Symbol('texture') ;
	const project = {
		x: Symbol('x'),
		z: Symbol('z'),
		width: rndBetween(),
		height: rndBetween(),
	};
	const getDegreeToRad = rndBetween();

	const spyOn = () => {
		jest.spyOn(ReactDrei, 'useTexture').mockReturnValue(texture);
		jest.spyOn(PositionService, 'threeDProject').mockReturnValue(project);
		jest.spyOn(helperService, 'degreeToRad')
			.mockReturnValue(getDegreeToRad);
	};

	test('AudioControl render scene', async () => {
		const getTexture = {
			true: 'unmute',
			false: 'mute',
		};
		const degree = -90;
		const childCount = 1;
		const groupProps = {
			rotation: [getDegreeToRad, 0, 0],
			position: [project.x, 1, project.z],
		};
		const planeProps = { args: [project.width, project.height] };
		const materialProps = { map: texture };

		spyOn();

		const scene = await helper.getScene(<AudioControl { ...context }/>);
		const child = scene.allChildren[0].allChildren;

		expect(child.length).toEqual(childCount);
		expect(scene.allChildren[0].props).toMatchObject(groupProps);
		expect(child[0].allChildren[0].props).toMatchObject(planeProps);
		expect(child[0].allChildren[1].props).toMatchObject(materialProps);
		expect(ReactDrei.useTexture).toHaveBeenCalledWith(`${ process.env
			.PUBLIC_URL }/audio/${ getTexture[state.audio] }.png`);
		expect(PositionService.threeDProject).toHaveBeenCalledWith({ ...context,
			data: config.audioControl });
		expect(helperService.degreeToRad).toHaveBeenCalledWith(degree);
	});

	test('FireEvent click', async () => {
		spyOn();

		const scene = await helper.getScene(<AudioControl { ...context }/>);
		const fireEvent = await helper
			.getFireEvent(<AudioControl { ...context }/>);
		const child = scene.allChildren[0].allChildren;

		await fireEvent(child[0], 'click');

		expect(actions.setAudio).toHaveBeenCalledWith(!state.audio);
	});
});

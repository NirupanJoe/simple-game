import { rndBetween, rndString } from '@laufire/utils/random';
import { React } from 'react';
import helper from '../../testHelper/helper';
import HealthBar from './healthBar';
import config from '../../core/config';
import PositionService from '../../services/positionService';
import * as helperService from '../../services/helperService';
import GameService from '../../services/gameService';

test('HealthBar', async () => {
	const state = { health: rndBetween() };
	const context = {
		config,
		state,
	};
	const childCount = 3;
	const getProject = {
		x: Symbol('x'),
		z: Symbol('z'),
		width: rndBetween(),
	};
	const healthProps = {
		width: rndBetween(),
		XPosition: Symbol('XPosition'),
	};
	const getDegreeToRad = rndBetween();
	const getCeilHealth = rndString();
	const getHealthColor = Symbol('color');
	const meshProps = {
		rotation: [getDegreeToRad, 0, 0],
		position: [getProject.x, 1, getProject.z],
	};
	const planeOneProps = {};
	const planeTwoProps = {
		position: [healthProps.XPosition, 0, 0],
	};
	const textProps = { text: getCeilHealth };
	const degree = -90;

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(getProject);
	jest.spyOn(PositionService, 'getHealthProps').mockReturnValue(healthProps);
	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);
	jest.spyOn(GameService, 'ceilHealth').mockReturnValue(getCeilHealth);
	jest.spyOn(GameService, 'healthColor').mockReturnValue(getHealthColor);

	const scene = await helper.getScene(<HealthBar { ...context }/>);
	const mesh = scene.allChildren[0];

	expect(mesh.allChildren.length).toEqual(childCount);
	expect(mesh.props).toMatchObject(meshProps);
	expect(mesh.allChildren[0].props).toMatchObject(planeOneProps);
	expect(mesh.allChildren[1].props).toMatchObject(planeTwoProps);
	expect(mesh.allChildren[2].props).toMatchObject(textProps);
	expect(PositionService.threeDProject).toHaveBeenCalledWith({ ...context,
		data: config.healthPosition });
	expect(helperService.degreeToRad).toHaveBeenCalledWith(degree);
	expect(PositionService.getHealthProps).toHaveBeenCalledWith({ ...context,
		data: { ...context.config.healthPosition, width: getProject.width }});
	expect(GameService.ceilHealth).toHaveBeenCalledWith(state.health);
});

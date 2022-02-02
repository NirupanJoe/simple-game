jest.mock('@react-spring/three', () => ({
	useSpring: jest.fn(),
	a: { meshStandardMaterial: jest.fn() },
}));

import { rndBetween, rndString } from '@laufire/utils/random';
import { React } from 'react';
import helper from '../../testHelper/helper';
import HealthBar from './healthBar';
import config from '../../core/config';
import PositionService from '../../services/positionService';
import * as helperService from '../../services/helperService';
import animation from './animation/animation';
import * as ReactSpring from '@react-spring/three';
import GameService from '../../services/gameService';

test('HealthBar', async () => {
	const state = { health: rndBetween() };
	const context = {
		config,
		state,
	};
	const childCount = 3;
	const getProject = {
		x: rndBetween(),
		z: rndBetween(),
	};
	const getDegreeToRad = rndBetween();
	const getAnimation = Symbol('getAnimation');
	const getSpring = { color: Symbol('color') };
	const getCeilHealth = rndString();
	const planeOneProps = {};
	const planeTwoProps = { scale: 1 / config.health };
	const textProps = { text: getCeilHealth };
	const degree = -90;

	jest.spyOn(PositionService, 'threeDProject').mockReturnValue(getProject);
	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);
	jest.spyOn(animation, 'healthBar').mockReturnValue(getAnimation);
	jest.spyOn(ReactSpring, 'useSpring').mockReturnValue(getSpring);
	jest.spyOn(GameService, 'ceilHealth').mockReturnValue(getCeilHealth);
	ReactSpring.a.meshStandardMaterial.mockReturnValue(<meshStandardMaterial/>);

	const scene = await helper.getScene(<HealthBar { ...context }/>);
	const mesh = scene.allChildren[0].allChildren;

	expect(mesh.length).toEqual(childCount);
	expect(mesh[0].props).toMatchObject(planeOneProps);
	expect(mesh[1].props).toMatchObject(planeTwoProps);
	expect(mesh[2].props).toMatchObject(textProps);
	expect(animation.healthBar).toHaveBeenCalledWith(state);
	expect(ReactSpring.useSpring).toHaveBeenCalledWith(getAnimation);
	expect(PositionService.threeDProject).toHaveBeenCalledWith({ ...context,
		data: config.healthPosition });
	expect(helperService.degreeToRad).toHaveBeenCalledWith(degree);
	expect(GameService.ceilHealth).toHaveBeenCalledWith(state.health);
});

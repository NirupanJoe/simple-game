import { rndBetween } from '@laufire/utils/random';
import { React } from 'react';
import * as helperService from '../../services/helperService';
import helper from '../../testHelper/helper';
import ContactShadows from './contactShadows';

test('ContactShadows', async () => {
	const componentCount = 1;
	const getDegreeToRad = rndBetween();
	const degree = 90;
	const x = 0.1;
	const z = 0.1;
	const props = {
		'rotation-x': getDegreeToRad,
		'position': [x, 0, z],
	};

	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);

	const scene = await helper.getScene(<ContactShadows/>);

	const component = scene.allChildren;

	expect(component.length).toBe(componentCount);
	expect(helperService.degreeToRad).toHaveBeenCalledWith(degree);
	expect(component[0].props).toEqual(props);
});

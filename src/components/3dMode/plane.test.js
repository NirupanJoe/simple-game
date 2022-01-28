import { rndBetween } from '@laufire/utils/random';
import { React } from 'react';
import * as helperService from '../../services/helperService';
import helper from '../../testHelper/helper';
import Plane from './plane';

test('Plane', async () => {
	const width = rndBetween();
	const height = rndBetween();
	const viewport = { width, height };
	const getDegreeToRad = rndBetween();

	jest.spyOn(helperService, 'degreeToRad').mockReturnValue(getDegreeToRad);

	const scene = await helper.getScene(<Plane viewport={ viewport }/>);

	expect(scene.allChildren.length).toEqual(1);
});

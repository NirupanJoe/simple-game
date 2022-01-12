import { rndString, rndBetween } from '@laufire/utils/random';
import * as THREE from 'three';

const hundred = 100;

const getId = ({ idLength }) => rndString(idLength);

const getVariance = (variance) =>
	rndBetween(hundred - (variance * hundred),
		hundred + (variance * hundred)) / hundred;

const isProbable = (probability) =>
	rndBetween(1, hundred) <= probability * hundred;

const flattenBullets = (hits) => hits.reduce((acc, { bullets }) =>
	[...acc, ...bullets], []);

const degreeToRad = (deg) => THREE.Math.degToRad(deg);

export { getId,
	getVariance, isProbable, flattenBullets, degreeToRad };

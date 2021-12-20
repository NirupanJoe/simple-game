import { rndString, rndBetween } from '@laufire/utils/random';

const hundred = 100;

const getId = ({ idLength }) => rndString(idLength);

const getVariance = (variance) =>
	rndBetween(hundred - (variance * hundred),
		hundred + (variance * hundred)) / hundred;

const isProbable = (probability) =>
	rndBetween(1, hundred) <= probability * hundred;

const flattenBullets = (hits) => hits.reduce((acc, { bullets }) =>
	[...acc, ...bullets], []);

export { getId,
	getVariance, isProbable, flattenBullets };

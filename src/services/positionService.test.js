import PositionService from './positionService';

describe('testing PositionService', () => {
	const { project } = PositionService;

	test('project returns value greater than or equal to 0', () => {
		let i = 0;
		const maxLoop = 1001;

		for(i = 0; i < maxLoop; i++) {
			const data = Math.floor(Math.random() * maxLoop);
			const result = project(data);

			expect(result).toBeGreaterThanOrEqual(0);
		}
	});
});

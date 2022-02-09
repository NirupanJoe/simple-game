import ReactThreeTestRenderer from '@react-three/test-renderer';

const two = 2;

const helper = {
	getScene: async (Component) => {
		await ReactThreeTestRenderer.create(Component);
		const { scene } = await ReactThreeTestRenderer.create(Component);

		return scene ;
	},

	getFireEvent: async (Component) => {
		await ReactThreeTestRenderer.create(Component);
		const { fireEvent } = await ReactThreeTestRenderer.create(Component);

		return fireEvent ;
	},

	testEffect: (fn, count) =>
		expect(fn).toHaveBeenCalledTimes(count * two),
};

export default helper;

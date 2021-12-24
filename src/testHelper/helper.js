import ReactThreeTestRenderer from '@react-three/test-renderer';

const helper = {
	getScene: async (Component) => {
		await ReactThreeTestRenderer.create(Component);
		const { scene } = await ReactThreeTestRenderer.create(Component);

		return scene;
	},
};

export default helper;

import ReactThreeTestRenderer from '@react-three/test-renderer';
import { range } from '@laufire/utils/collection';
const two = 2;
const retryTimes = 10;

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

	retry: (fn, times = retryTimes) => range(0, times).map(fn),

	testEffect: (fn, count) =>
		expect(fn).toHaveBeenCalledTimes(count * two),
};

export default helper;

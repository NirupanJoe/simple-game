import { rndValue } from '@laufire/utils/random';
import { fireEvent, render } from '@testing-library/react';
import WelcomeScreen from './welcomeScreen';

describe('WelcomeScreen', () => {
	const actions = {
		gameStart: jest.fn(),
	};
	const state = {
		ready: rndValue([true, false]),
	};
	const context = {
		actions,
		state,
	};

	test('Render WelcomeScreen', () => {
		const component = render(WelcomeScreen(context))
			.getByRole('welcomeScreen');

		expect(component).toHaveTextContent('Click now');
		expect(component).toHaveClass('welcomeScreen');
		expect(component).toBeInTheDocument();
	});

	test('Fire Event', () => {
		const component = render(WelcomeScreen(context))
			.getByRole('welcomeScreen');

		fireEvent.click(component, !state.ready);

		expect(actions.gameStart).toHaveBeenCalledWith(!state.ready);
	});
});

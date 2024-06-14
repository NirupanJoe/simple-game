import { React } from 'react';

const WelcomeScreen = (context) => {
	const { actions, state } = context;

	return (
		<div
			role="welcomeScreen"
			className="welcomeScreen"
			onClick={ () => actions.gameStart(!state.ready) }
		>
			<button>Start</button>
		</div>);
};

export default WelcomeScreen;

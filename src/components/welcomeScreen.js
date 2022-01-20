import { React } from 'react';

const WelcomeScreen = (context) => {
	const { actions, state } = context;

	return (
		<div
			role="welcomeScreen"
			className="welcomeScreen"
			onClick={ () => actions.gameStart(!state.ready) }
		>
			Click now
		</div>);
};

export default WelcomeScreen;

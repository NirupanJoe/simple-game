import { React } from 'react';

const WelcomeScreen = (context) => {
	const { actions, state } = context;

	return (
		<div
			role="welcomeScreen"
			className="welcomeScreen"
		>
			<button onClick={ () => actions.gameStart(!state.ready) }>
				Start
			</button>
		</div>);
};

export default WelcomeScreen;

import { React } from 'react';
import HelpList from './shortcutScreens/HelpList';

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
			<button
				className="helpButton"
				onClick={ (e) => {
					e.target.blur();
					actions.setHelp(!state.help);
				} }
			>Help</button>
			<HelpList { ...context }/>
		</div>);
};

export default WelcomeScreen;

const mute = (context) => context.actions.setAudio(!context.state.audio);

const gameStart = (context) => {
	!context.state.ready &&	context.actions.gameStart(!context.state.ready);
};

const shortcut = {
	M: mute,
	ENTER: gameStart,
};

export default shortcut;

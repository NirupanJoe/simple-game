
const shortcut = {
	mute: (context) => context.actions.setAudio(!context.state.audio),

	gameStart: (context) =>
		!context.state.ready && context.actions.gameStart(!context.state.ready),
};

export default shortcut;

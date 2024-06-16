const shortcut = {
	mute: (context) => context.actions.setAudio(!context.state.audio),

	gameStart: (context) => {
		if(!context.state.help) {
			!context.state.ready
			&& context.actions.gameStart(!context.state.ready);
		}
	},

	help: (context) => {
		context.actions.setHelp(!context.state.help);
		shortcut.playPause(context);
	},

	playPause: (context) =>
		context.actions.setPlayPause(!context.state.playPause),

};

export default shortcut;

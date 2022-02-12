const mute = (context) => context.actions.setAudio(!context.state.audio);

const shortcut = {
	M: mute,
};

export default shortcut;

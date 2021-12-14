const getMode = ({ config: { defaultMode }}) =>
	// eslint-disable-next-line no-undef
	new URLSearchParams(window.location.search).get('mode') || defaultMode;

export default getMode;

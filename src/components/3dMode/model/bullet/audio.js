import React from 'react';
import AudioClip from '../../audioClip';

const Audio = (context) => {
	const props = {
		loop: false,
		url: 'bullet',
	};

	return (
		<AudioClip { ...{
			...context,
			data: props,
		} }
		/>
	);
};

export default Audio;

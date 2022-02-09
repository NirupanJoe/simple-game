import React from 'react';
import AudioClip from '../../audioClip';

const Audio = (context) => {
	const props = {
		url: 'flight',
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

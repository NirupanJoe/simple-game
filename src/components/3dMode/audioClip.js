import { React } from 'react';
import { PositionalAudio } from '@react-three/drei';

const AudioClip = ({ data: { url, ...data }, state: { audio }}) => {
	const props = {
		autoplay: true,
		url: `${ process.env.PUBLIC_URL }/audio/${ url }.mp3`,
	};

	return audio
	&& <PositionalAudio { ...{ ...props, ...data } }/>;
};

export default AudioClip;

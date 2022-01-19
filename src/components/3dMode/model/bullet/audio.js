import React from 'react';
import { PositionalAudio } from '@react-three/drei';

const Audio = () =>
	<PositionalAudio { ...{
		loop: false,
		autoplay: true,
		distance: 5,
		url: `${ process.env.PUBLIC_URL }/audio/bullet.mp3`,
	} }
	/>;

export default Audio;

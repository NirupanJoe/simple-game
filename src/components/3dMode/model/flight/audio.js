import React from 'react';
import { PositionalAudio } from '@react-three/drei';

const Audio = () =>
	<PositionalAudio { ...{
		loop: true,
		autoplay: true,
		distance: 5,
		url: `${ process.env.PUBLIC_URL }/audio/flight.mp3`,
	} }
	/>;

export default Audio;

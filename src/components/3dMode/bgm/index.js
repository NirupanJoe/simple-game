import { React } from 'react';
import { PositionalAudio } from '@react-three/drei';

const Bgm = () =>
	<PositionalAudio { ...{
		loop: true,
		autoplay: true,
		distance: 5,
		url: `${ process.env.PUBLIC_URL }/audio/background.mp3`,
	} }
	/>;

export default Bgm;

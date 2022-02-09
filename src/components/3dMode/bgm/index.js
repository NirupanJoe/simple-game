import { React } from 'react';
import AudioClip from '../audioClip';

const Bgm = (context) => {
	const props = {
		url: 'background',
	};

	return (
		<AudioClip { ...{
			...context,
			data: props,
		} }
		/>);
};

export default Bgm;

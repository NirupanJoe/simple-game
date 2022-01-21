import { React } from 'react';
import { ContactShadows as Shadows } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';

const degree = 90;
const x = 0.1;
const y = 0;
const z = 0.1;

const ContactShadows = () =>
	<Shadows
		rotation-x={ degreeToRad(degree) }
		position={ [x, y, z] }
		opacity={ 1 }
		width={ 20 }
		height={ 20 }
		blur={ 0.2 }
		far={ 4.5 }
	/>;

export default ContactShadows;

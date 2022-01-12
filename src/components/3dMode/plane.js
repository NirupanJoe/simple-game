import { React } from 'react';
import { Plane as PlaneComponent } from '@react-three/drei';
import { degreeToRad } from '../../services/helperService';

const degree = -90;

const Plane = ({ viewport: { width, height }}) =>
	<PlaneComponent
		rotation={ [degreeToRad(degree), 0, 0] }
		args={ [width, height] }
	>
		<meshStandardMaterial
			attach="material"
			color="green"
		/>
	</PlaneComponent>;

export default Plane;

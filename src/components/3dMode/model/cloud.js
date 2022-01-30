import { React } from 'react';
import { Cloud as CloudComponent } from '@react-three/drei';

const Cloud = ({ data: { id, x, y, z, width }}) =>
	<mesh key={ id } position={ [x, y, z] }>
		<CloudComponent
			speed={ 0.1 }
			opacity={ 0.6 }
			segments={ 10 }
			width={ width }
			scale={ 0.3 }
		/>
	</mesh>;

export default Cloud;

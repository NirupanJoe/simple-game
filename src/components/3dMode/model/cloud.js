import { React } from 'react';
import { Cloud as CloudComponent } from '@react-three/drei';

const Cloud = ({ data: { id, x, y, width }}) =>
	<mesh key={ id } position={ [x, y, 0] }>
		<CloudComponent
			speed={ 0.1 }
			opacity={ 0.6 }
			segments={ 10 }
			width={ width }
			scale={ 0.3 }
		/>
	</mesh>;

export default Cloud;

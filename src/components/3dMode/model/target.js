import { React } from 'react';
import { a } from '@react-spring/three';
// import { useGLTF } from '@react-three/drei';

const Target = ({ data:
	{ rotation, position, color, id, scene, materials }}) => {
	// const { scene, materials } = useGLTF(`${ process.env.PUBLIC_URL }/target/target.gltf`);
	// const { actions } = useAnimations(animations);

	// useEffect(() => actions.default.play(), []);
	// eslint-disable-next-line no-console
	console.log();
	return (
		<a.mesh
			key={ id }
			rotation={ rotation }
			position={ position }
		>
			<directionalLight intensity={ 0.8 }/>
			<a.primitive
				object={ scene }
				scale={ 0.8 }
				material={ materials.flight }
				material-color={ color }
			/>
		</a.mesh>
	);
};

export default Target;

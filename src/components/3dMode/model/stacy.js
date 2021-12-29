/* eslint-disable no-magic-numbers */
import React, { useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { a } from '@react-spring/three';

// eslint-disable-next-line max-lines-per-function
const Stacy = ({ color }) => {
	const { scene } = useGLTF(`${ process.env.PUBLIC_URL }/target/stacy.gltf`);
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes } = useGraph(clone);
	const texture = useTexture(`${ process.env.PUBLIC_URL }/target/stacy.jpg`);

	return (
		<group dispose={ null }>
			<group
				rotation={ [Math.PI / 2, 0, 0] }
				scale={ 0.01 }
			>
				<primitive object={ nodes.mixamorigHips }/>
				<skinnedMesh
					castShadow={ true }
					receiveShadow={ true }
					geometry={ nodes.stacy.geometry }
					skeleton={ nodes.stacy.skeleton }
					scale={ 100 }
				>
					<a.meshStandardMaterial
						map={ texture }
						map-flipY={ false }
						skinning={ true }
						color={ color }
					/>
				</skinnedMesh>
			</group>
		</group>
	);
};

export default Stacy;

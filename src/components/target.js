import { React } from 'react';

const Target = (target) => {
	const { id, height, width, x, y, image } = target;
	const two = 2;
	const style = {
		position: 'absolute',
		left: `${ x - (width / two) }%`,
		top: `${ y }%`,
		height: `${ height }vw`,
		width: `${ width }vw`,
	};

	return (
		<img
			key={ id }
			role="targets"
			style={ style }
			src={ image }
		/>
	);
};

export default Target;

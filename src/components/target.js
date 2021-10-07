import { React } from 'react';

const two = 2;
const ten = 10;

const Target = (target) => {
	const { id, height, width, x, y, image } = target;
	const style = {
		left: `${ x - (width / two) }%`,
		top: `${ y }%`,
		height: `${ height }vw`,
		width: `${ width }vw`,
		filter: `hue-rotate(${ x * ten }deg)`,
	};

	return (
		<img
			key={ id }
			className="target"
			role="targets"
			style={ style }
			src={ image }
		/>
	);
};

export default Target;

import { React } from 'react';

const two = 2;

const Target = (target) => {
	const { id, height, width, x, y, image, filter } = target;
	const style = {
		left: `${ x - (width / two) }%`,
		top: `${ y }%`,
		height: `${ height }vw`,
		width: `${ width }vw`,
		filter: `hue-rotate(${ filter }deg)`,
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
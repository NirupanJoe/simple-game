import { React } from 'react';
import PositionService from '../services/positionService';

const Target = (target) => {
	const { id, height, width, image, filter } = target;
	const { x, y } = PositionService.project(target);
	const style = {
		left: `${ x }%`,
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

import { React } from 'react';
import PositionService from '../services/positionService';

const Target = (target) => {
	const { id, height, width, y, image, filter } = target;
	const style = {
		left: `${ PositionService.project(target) }%`,
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

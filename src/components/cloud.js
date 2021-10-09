import React from 'react';

const Cloud = (data) => {
	const { x, y, id } = data;

	const style = {
		top: `${ y }%`,
		left: `${ x }%`,
	};

	return <div key={ id }role="cloud" style={ style } className="cloud"/>;
};

export default Cloud;

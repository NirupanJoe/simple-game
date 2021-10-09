import React from 'react';

const Cloud = (data) => {
	const { x, y } = data;

	const style = {
		top: `${ y }%`,
		left: `${ x }%`,
	};

	return <div role="cloud" style={ style } className="cloud"/>;
};

export default Cloud;

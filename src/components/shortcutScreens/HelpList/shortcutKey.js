import React from 'react';

const ShortcutKey = ({ key, desc }, i) =>
	<div key={ i } className="shortcutKey">
		<div className="desc">{desc}</div>
		<div className="key">{key}</div>
	</div>;

export default ShortcutKey;

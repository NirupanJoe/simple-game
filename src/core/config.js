const config = {
	tickerDelay: 1000,
	health: 100,
	damage: 1,
	bgnScreenYIncre: 1,
	maxTargets: 5,
	targets: {
		shooter: {
			health: 1,
			damage: 1,
			type: 'shooter',
			// eslint-disable-next-line max-len
			image: 'https://i0.wp.com/apkdeal.com/wp-content/uploads/2017/12/crazy-plane-flight-shooting-game-game-apk-download-for-free-in-your-android-ios.jpg?fit=600%2C600&ssl=1&resize=350%2C200',
			height: 10,
			width: 20,
			variance: 0.2,
			prop: {
				spawn: 1,
			},
		},
	},
};

export default config;

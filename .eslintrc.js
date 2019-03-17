module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'indent': 0,
		'no-tabs': 0,
                'yoda': 0,
                'no-plusplus': 0,
                'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
                'no-alert': 0,
                'class-methods-use-this': 0,
                'no-empty-function': 0,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};

module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential'
	],
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'vue'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
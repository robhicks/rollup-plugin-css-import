module.exports = {
	entry: 'src/index.js',
	plugins: [
		require('rollup-plugin-babel')({
			runtimeHelpers: true,
		}),
	],
	external: [
		'fs',
		'path',
		'stylus',
		'rollup-pluginutils',
		'css-modules-loader-core',
		'babel-runtime/core-js/json/stringify',
    'babel-runtime/helpers/asyncToGenerator',
    'babel-runtime/regenerator',
	],
	targets: [
		{
			dest: 'lib/rollup-plugin-css-import.cjs.js',
			format: 'cjs',
		},
		{
			dest: 'lib/rollup-plugin-css-import.es.js',
			format: 'es',
		}
	],
}

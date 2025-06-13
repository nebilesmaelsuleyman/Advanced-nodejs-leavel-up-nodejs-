import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js },
		extends: ['js/recommended','plugin:prettier/recommended'],
        plugins:["prettier"]
	},
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
])

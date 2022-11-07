import { defineConfig } from 'windicss/helpers';
import formPlugin from 'windicss/plugin/forms';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				back: '#EFF6F1',
				primary: '#45B986',
			},
		},
	},
	plugins: [formPlugin],
});

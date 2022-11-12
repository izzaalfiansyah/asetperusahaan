import { http, showSnackbar } from '../../lib';
import { Pengaturan } from './type';

export const getPengaturan = async () => {
	try {
		// const res = await http.get('/pengaturan');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						nama: 'e-aset',
						logo: '',
						sejarah:
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
						visi: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
						misi: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data', 'error');
	}
};

export const updatePengaturan = async (req: Pengaturan) => {
	try {
		// const res = await http.post('/pengaturan');
		const res = await new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
		showSnackbar('data berhasil disimpan');

		return res;
	} catch {
		showSnackbar('gagal menyimpan data', 'error');
	}
};

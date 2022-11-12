import { http, showSnackbar } from '../../lib';
import { Galeri } from './type';

export const getGaleri = async () => {
	try {
		// const res = await http.get('/riwayat-aset');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 1,
							fotoUrl:
								'https://www.akuntansipendidik.com/wp-content/uploads/2020/04/aktiva-tetap-tanah-b3ed.jpg',
						},
						{
							id: 5,
							fotoUrl:
								'https://webixytech.com/admin_panel/assets/project_images/1625120256What_is_an_IT_company.jpg',
						},
						{
							id: 2,
							fotoUrl:
								'https://cdn.medcom.id/dynamic/content/2020/11/13/1209801/CMfQWUE7nu.jpg?w=480',
						},
						{
							id: 4,
							fotoUrl:
								'https://www.wework.com/ideas/wp-content/uploads/sites/4/2017/06/Web_150DPI-20190927_10th_Floor_Conference_Room_2_v1-1120x630.jpg',
						},
						{
							id: 3,
							fotoUrl:
								'https://static.republika.co.id/uploads/images/inpicture_slide/hingga-akhir-2021-jumlah-aset-tanah-pln-yang-telah_220428112018-758.jpeg',
						},
					],
				});
			}, 500);
		});
		return res;
	} catch {
		showSnackbar('gagal mengambil data', 'error');
	}
};

export const addGaleri = async (req: Galeri) => {
	try {
		// await http.post('/riwayat-aset', req);
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
		showSnackbar('data berhasil ditambah');
	} catch {
		showSnackbar('data gagal ditambah', 'error');
	}
};

export const updateGaleri = async (id: any, req: Galeri) => {
	try {
		// await http.put('/riwayat-aset/' + id, req);
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
		showSnackbar('data berhasil diedit');
	} catch {
		showSnackbar('data gagal diedit', 'error');
	}
};

export const deleteGaleri = async (id: any) => {
	try {
		// await http.delete('/riwayat-aset/' + id);
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, 500);
		});
		showSnackbar('data berhasil dihapus');
	} catch {
		showSnackbar('data gagal dihapus', 'error');
	}
};

export const findGaleri = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						id: 1,
						fotoUrl:
							'https://www.akuntansipendidik.com/wp-content/uploads/2020/04/aktiva-tetap-tanah-b3ed.jpg',
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data Galeri', 'error');
	}
};

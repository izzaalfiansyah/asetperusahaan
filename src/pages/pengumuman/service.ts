import { http, showSnackbar } from '../../lib';
import { Pengumuman } from './type';

export const getPengumuman = async () => {
	try {
		// const res = await http.get('/riwayat-aset');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 1,
							judul: 'Pengumuman 1',
							isi: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam expedita sapiente, esse vel autem itaque! Quidem autem, optio praesentium aperiam, explicabo similique sapiente obcaecati odio iste quod adipisci dolore debitis.',
							created_at: '2022-10-28',
						},
						{
							id: 2,
							judul: 'Pengumuman 2',
							isi: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam expedita sapiente, esse vel autem itaque! Quidem autem, optio praesentium aperiam, explicabo similique sapiente obcaecati odio iste quod adipisci dolore debitis.',
							created_at: '2022-10-28',
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

export const addPengumuman = async (req: Pengumuman) => {
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

export const updatePengumuman = async (id: any, req: Pengumuman) => {
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

export const deletePengumuman = async (id: any) => {
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

export const findPengumuman = async (id: any) => {
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
		showSnackbar('gagal mengambil data Pengumuman', 'error');
	}
};

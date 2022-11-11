import { http, showSnackbar } from '../../lib';
import { LokasiAset } from './type';

export const getLokasiAset = async (props: { jenis: string }) => {
	try {
		// const res = await http.get('/lokasi-aset');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data:
						props.jenis == 'PEMDA'
							? [
									{
										id: 1,
										lokasi: [-8.168944661731015, 113.70218722640044],
									},
									{
										id: 2,
										lokasi: [-8.167216837876582, 113.6979739720585],
									},
							  ]
							: [],
				});
			}, 500);
		});
		return res;
	} catch {
		showSnackbar('gagal mengambil data', 'error');
	}
};

export const addLokasiAset = async (req: LokasiAset) => {
	try {
		// await http.post('/lokasi-aset', req);
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

export const updateLokasiAset = async (id: any, req: LokasiAset) => {
	try {
		// await http.put('/lokasi-aset/' + id, req);
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

export const deleteLokasiAset = async (id: any) => {
	try {
		// await http.delete('/lokasi-aset/' + id);
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

export const findLokasiAset = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						id: 1,
						lokasi: [-8.168944661731015, 113.70218722640044],
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data LokasiAset', 'error');
	}
};

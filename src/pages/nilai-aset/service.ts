import { http, showSnackbar } from '../../lib';
import { NilaiAset } from './type';

export const getNilaiAset = async () => {
	try {
		// const res = await http.get('/nilai-aset');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 1,
							nilai_penyusutan: 1000000,
							nilai_jual: 2000000,
							nilai_kontrak: 500000,
							nilai_lelang: 2500000,
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

export const addNilaiAset = async (req: NilaiAset) => {
	try {
		// await http.post('/nilai-aset', req);
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

export const updateNilaiAset = async (id: any, req: NilaiAset) => {
	try {
		// await http.put('/nilai-aset/' + id, req);
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

export const deleteNilaiAset = async (id: any) => {
	try {
		// await http.delete('/nilai-aset/' + id);
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

export const findNilaiAset = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						id: 1,
						nilai_penyusutan: 1000000,
						nilai_jual: 2000000,
						nilai_kontrak: 500000,
						nilai_lelang: 2500000,
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data NilaiAset', 'error');
	}
};

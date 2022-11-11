import { http, showSnackbar } from '../../lib';
import { RiwayatAset } from './type';

export const getRiwayatAset = async () => {
	try {
		// const res = await http.get('/riwayat-aset');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 1,
							jenis: 'Aset Properti',
							subjenis: 'Tanah',
							subsubjenis: 'Tanah basah',
							sumber_anggaran: 'APBD',
							standarisasi_kebijakan: 'Undang-undang',
							sistem_pengadaan_aset: 'Direct procurement',
						},
						{
							id: 2,
							jenis: 'Aset Transportasi',
							subjenis: 'MRT',
							sumber_anggaran: 'Non APBD',
							standarisasi_kebijakan: 'Peraturan Menteri',
							sistem_pengadaan_aset: 'Vendor tunggal',
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

export const addRiwayatAset = async (req: RiwayatAset) => {
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

export const updateRiwayatAset = async (id: any, req: RiwayatAset) => {
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

export const deleteRiwayatAset = async (id: any) => {
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

export const findRiwayatAset = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						id: 1,
						jenis: 'Aset Properti',
						subjenis: 'Tanah',
						subsubjenis: 'Tanah basah',
						sumber_anggaran: 'APBD',
						standarisasi_kebijakan: 'Undang-undang',
						sistem_pengadaan_aset: 'Direct procurement',
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data RiwayatAset', 'error');
	}
};

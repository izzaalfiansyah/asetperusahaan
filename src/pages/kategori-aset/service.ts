import { showSnackbar } from '../../lib';
import { KategoriAset } from './type';

export const getKategoriAset = (props: { jenis: string }) => {
	try {
		const res = new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data:
						props.jenis == 'PEMDA'
							? [
									{
										id: 1,
										jenis: 'Bangunan',
										nama: 'Gedung lantai 3',
										pembelian: 'cash',
										alokasi_dana: 'saham',
										buktiUrl:
											'https://manajemenkeuangan.net/wp-content/uploads/2019/09/aktiva-tetap-8.jpg',
										status: '1',
									},
									{
										id: 2,
										jenis: 'Bangunan',
										nama: 'Tanah kavling',
										pembelian: 'cash',
										alokasi_dana: 'saham',
										buktiUrl:
											'https://asset.kompas.com/crops/q6PxIvZp4zHggZDiUOCLf2lbYKM=/0x0:0x0/750x500/data/photo/2021/05/21/60a75629c2e16.jpeg',
										status: '2',
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

export const addKategoriAset = async (req: KategoriAset) => {
	try {
		// await http.post('/kategori-aset', req);
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

export const updateKategoriAset = async (id: any, req: KategoriAset) => {
	try {
		// await http.put('/kategori-aset/' + id, req);
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

export const deleteKategoriAset = async (id: any) => {
	try {
		// await http.delete('/kategori-aset/' + id);
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

export const findKategoriAset = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						id: 1,
						jenis: 'Bangunan',
						nama: 'Gedung lantai 3',
						pembelian: 'cash',
						alokasi_dana: 'saham',
						buktiUrl: 'https://manajemenkeuangan.net/wp-content/uploads/2019/09/aktiva-tetap-8.jpg',
						status: '1',
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data KategoriAset', 'error');
	}
};

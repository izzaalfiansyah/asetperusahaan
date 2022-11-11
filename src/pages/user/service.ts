import { http, showSnackbar } from '../../lib';
import { User } from './type';

export const getUser = async () => {
	try {
		// const res = await http.get('/user');
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 1,
							username: 'izzaalfiansyah',
							password: 'izzaalfiansyah',
							nama: 'Muhammad Izza Alfiansyah',
							telepon: '081231921351',
							alamat: 'Gumukmas - Jember',
							role: '1',
						},
						{
							id: 2,
							username: 'raflyazzuhri',
							password: 'raflyazzuhri',
							nama: 'Muhammad Rafly Azzuhri',
							telepon: '081259203376',
							alamat: 'Gumukmas - Jember',
							role: '2',
						},
						{
							id: 3,
							username: 'rickymahbubi',
							password: 'rickymahbubi',
							nama: 'Ricky Ahmad Mahbubi',
							telepon: '082330538264',
							alamat: 'Gumukmas - Jember',
							role: '2',
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

export const addUser = async (req: User) => {
	try {
		// await http.post('/user', req);
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

export const updateUser = async (id: any, req: User) => {
	try {
		// await http.put('/user/' + id, req);
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

export const deleteUser = async (id: any) => {
	try {
		// await http.delete('/user/' + id);
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

export const findUser = async (id: any) => {
	try {
		const res = await new Promise<{ data: any }>((resolve) => {
			setTimeout(() => {
				resolve({
					data: {
						username: 'superadmin',
						password: '',
						nama: 'Muhammad Izza Alfiansyah',
						telepon: '6281231921251',
						alamat: 'Gumukmas - Jember',
					},
				});
			}, 500);
		});

		return res;
	} catch {
		showSnackbar('gagal mengambil data user', 'error');
	}
};

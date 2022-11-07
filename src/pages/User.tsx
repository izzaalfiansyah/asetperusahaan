import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { showSnackbar } from '../lib';

export interface User {
	id?: number;
	username?: string;
	password?: string;
	nama?: string;
	telepon?: string;
	alamat?: string;
	role?: string;
}

export default function () {
	const [data, setData] = createSignal<User[]>([]);
	const [req, setReq] = createSignal<User>({});
	const [loading, setLoading] = createSignal(false);
	const [modalSave, setModalSave] = createSignal(false);
	const [modalDelete, setModalDelete] = createSignal(false);
	const [edit, setEdit] = createSignal(false);

	function nullable() {
		setReq({});
	}

	async function get() {
		nullable();
		await setLoading(true);
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
		setData(res.data);
		setLoading(false);
	}

	async function save(e: any) {
		e.preventDefault();

		if (edit()) {
			await new Promise((resolve) => {
				setTimeout(() => {
					setData((items: any) => {
						const newItems = items.map((item: any) => {
							return item.id == req().id ? req() : item;
						});
						return [...newItems];
					});
					resolve(true);
				}, 500);
			});
		} else {
			await new Promise((resolve) => {
				setTimeout(() => {
					setData((items: any) => {
						const item = { ...req(), id: data()?.length + 1 };
						return [...items, item];
					});
					resolve(true);
				}, 500);
			});
		}

		showSnackbar('data berhasil disimpan');
		setModalSave(false);
	}

	async function destroy(e: any) {
		e.preventDefault();

		await new Promise((resolve) => {
			setTimeout(() => {
				setData((items: any) => {
					const newItems = items.filter((item: any) => {
						return item.id == req().id ? false : item;
					});
					return newItems;
				});
				resolve(true);
			}, 500);
		});

		showSnackbar('data berhasil dihapus');
		setModalDelete(false);
	}

	function handleReq(key: string, value: any) {
		setReq((item) => {
			return { ...item, [key]: value };
		});
	}

	onMount(() => {
		get();
	});

	return (
		<>
			<Header>Data User</Header>
			<Card>
				<div class="mb-4">
					<Button
						variant="primary"
						icon={<FaSolidPlus />}
						onClick={() => {
							nullable();
							setModalSave(true);
							setEdit(false);
						}}
					>
						Tambah
					</Button>
				</div>
				<div class="relative">
					<Table
						headers={['Username', 'Nama', 'Telepon', 'Role', '']}
						items={data()?.map((item) => {
							return [
								item.username,
								item.nama,
								item.telepon,
								item.role,
								<>
									<button
										class="text-primary mr-3"
										onClick={() => {
											setModalSave(true);
											setEdit(true);
											setReq({ ...item, password: '' });

											handleReq('role', '');
											handleReq('role', item.role);
										}}
									>
										<FaSolidPen />
									</button>
									<button
										class="text-red-400"
										onClick={() => {
											setModalDelete(true);
											setReq({ ...item });
										}}
									>
										<FaSolidTrash />
									</button>
								</>,
							];
						})}
					></Table>
					<Show when={loading()}>
						<Loading />
					</Show>
				</div>
			</Card>

			<form onSubmit={save}>
				<Modal model={[modalSave, setModalSave]}>
					<div class="text-xl mb-5">{edit() ? 'Edit' : 'Tambah'} Data</div>
					<Input
						label="Nama"
						placeholder="Masukkan Nama"
						value={req()?.nama}
						onInput={(e: any) => handleReq('nama', e.target.value)}
					></Input>
					<Input
						type="tel"
						label="Telepon"
						placeholder="Masukkan Telepon"
						value={req()?.telepon}
						onInput={(e: any) => handleReq('telepon', e.target.value)}
					></Input>
					<Textarea
						label="Alamat"
						placeholder="Masukkan Alamat"
						value={req()?.alamat}
						onInput={(e: any) => handleReq('alamat', e.target.value)}
					></Textarea>
					<Select
						label="Role"
						value={req()?.role}
						onChange={(e: any) => handleReq('role', e.target.value)}
						items={[
							{
								text: 'Pilih Role',
								value: '',
							},
							{
								text: 'Superadmin',
								value: '1',
							},
							{
								text: 'User',
								value: '2',
							},
						]}
					></Select>
					<Input
						label="Username"
						placeholder="Masukkan Username"
						value={req()?.username}
						onInput={(e: any) => handleReq('username', e.target.value)}
					></Input>
					<Input
						label="Password"
						type="password"
						placeholder="Masukkan Password"
						value={req()?.password}
						onInput={(e: any) => handleReq('password', e.target.value)}
					></Input>
					<Show when={edit()}>
						<div class="text-xs -mt-3 text-gray-400">
							Kosongkan jika tidak ingin mengganti password.
						</div>
					</Show>

					<div class="mt-10 text-right">
						<Button variant="primary" type="submit">
							Simpan
						</Button>
					</div>
				</Modal>
			</form>

			<form onSubmit={destroy}>
				<Modal model={[modalDelete, setModalDelete]}>
					<div>
						Anda yakin untuk menghapus user <span class="font-semibold">{req()?.nama}</span>?
					</div>
					<div class="mt-5 text-right">
						<Button variant="primary" type="submit">
							Hapus
						</Button>
					</div>
				</Modal>
			</form>
		</>
	);
}

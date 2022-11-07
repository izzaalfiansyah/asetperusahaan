import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { readFile, showSnackbar } from '../lib';

export interface Galeri {
	id?: number;
	fotoUrl?: string;
}

export default function () {
	const [data, setData] = createSignal<Galeri[]>([]);
	const [req, setReq] = createSignal<Galeri>({});
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
			<Header>Data Galeri</Header>
			<Card>
				<div>
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
			</Card>
			<div class="relative">
				<div class="lg:grid-cols-5 grid-cols-2 grid gap-5">
					<For each={data()}>
						{(item) => (
							<a
								href={item.fotoUrl}
								target="_blank"
								class="rounded shadow relative overflow-hidden group"
							>
								<img
									src={item.fotoUrl}
									class="h-180px rounded w-full transition transform group-hover:scale-110 object-cover"
									alt=""
								/>
								<div class="text-right absolute bottom-0 right-0 p-2 transition transform translate-x-full group-hover:(translate-x-0)">
									<div class="bg-white w-8 h-8 rounded shadow flex items-center justify-center">
										<button
											class="text-red-400"
											onClick={() => {
												setModalDelete(true);
												setReq({ ...item });
											}}
										>
											<FaSolidTrash size={14} />
										</button>
									</div>
								</div>
							</a>
						)}
					</For>
				</div>
				<Show when={loading()}>
					<Card>
						<div class="text-center">Memuat...</div>
					</Card>
				</Show>
			</div>

			<form onSubmit={save}>
				<Modal model={[modalSave, setModalSave]}>
					<div class="text-xl mb-5">{edit() ? 'Edit' : 'Tambah'} Data</div>
					<Input
						type="file"
						label="Foto"
						title="Pilih Foto"
						onChange={(e: any) => {
							readFile(e.target.files[0], (res: any) => {
								handleReq('fotoUrl', res);
							});
						}}
					></Input>

					<div class="mt-10 text-right">
						<Button variant="primary" type="submit">
							Simpan
						</Button>
					</div>
				</Modal>
			</form>

			<form onSubmit={destroy}>
				<Modal model={[modalDelete, setModalDelete]}>
					<div>Anda yakin untuk menghapus galeri terpilih?</div>
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

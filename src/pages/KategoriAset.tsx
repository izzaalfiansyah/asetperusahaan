import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { readFile, showSnackbar } from '../lib';

export interface KategoriAset {
	id?: number;
	jenis?: string;
	nama?: string;
	pembelian?: string;
	alokasi_dana?: string;
	bukti?: string;
	buktiUrl?: string;
	status?: string;
}

export const jenis = [
	'Bangunan',
	'Transportasi',
	'Bisnis & Investasi',
	'Kesehatan',
	'Pendidikan',
	'ESTEBU',
	'SDM',
];

export default function (props: { jenis: string }) {
	const [data, setData] = createSignal<KategoriAset[]>([]);
	const [req, setReq] = createSignal<KategoriAset>({});
	const [loading, setLoading] = createSignal(false);
	const [modalSave, setModalSave] = createSignal(false);
	const [modalDelete, setModalDelete] = createSignal(false);
	const [edit, setEdit] = createSignal(false);

	function nullable() {
		setReq({
			jenis: props.jenis,
		});
	}

	async function get() {
		nullable();
		await setLoading(true);
		const res = await new Promise<{ data: any }>((resolve) => {
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
			<Header>
				Aset {props.jenis[0]}
				{props.jenis.slice(1).toLowerCase()}
			</Header>
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
				<Show when={!data().length}>
					<div class="bg-white rounded p-4 shadow">
						<div class="text-center">data tidak tersedia</div>
					</div>
				</Show>
				<div class="lg:grid-cols-2 grid-cols-1 grid gap-5 mb-5">
					<For each={data()}>
						{(item) => (
							<div class="bg-white shadow rounded p-4 relative group transition hover:bg-gray-50 overflow-hidden">
								<div class="absolute top-0 right-0 bg-primary shadow p-1 w-100px text-center text-white text-xs font-semibold rounded-bl z-3">
									{item.jenis}
								</div>
								<div class="flex items-center lg:flex-row flex-col">
									<div class="flex relative items-center justify-center w-full lg:w-1/2 overflow-hidden">
										<a href={item.buktiUrl} class="block w-full lg:mb-0 mb-5" target="_blank">
											<img src={item.buktiUrl} alt="" class="rounded w-full h-120px object-cover" />
										</a>
										<div class="absolute bg-white bottom-0 left-0 right-0 p-1 px-2 rounded-b transition transform translate-y-full group-hover:translate-y-0">
											{item.nama}
										</div>
									</div>
									<div class="w-full lg:w-1/2 lg:pl-4 relative">
										<div class="overflow-x-hidden">
											<div class="mb-1">
												<div class="text-xs">Pembelian</div>
												<div class="font-medium text-shadow text-sm truncate">{item.pembelian}</div>
											</div>
											<div class="mb-1">
												<div class="text-xs">Alokasi Dana</div>
												<div class="font-medium text-shadow text-sm truncate">
													{item.alokasi_dana}
												</div>
											</div>
											<div class="mb-1">
												<div class="text-xs">Status</div>
												<div class="font-medium text-shadow text-sm truncate">{item.status}</div>
											</div>
										</div>
										<div class="flex justify-center lg:justify-start mt-3 absolute bottom-0 right-0">
											<button
												class="text-primary mr-3"
												onClick={() => {
													setModalSave(true);
													setEdit(true);
													setReq({ ...item });
												}}
											>
												<FaSolidPen size={14} />
											</button>
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
								</div>
							</div>
						)}
					</For>
				</div>
				<Show when={loading()}>
					<Loading />
				</Show>
			</div>

			<form onSubmit={save}>
				<Modal model={[modalSave, setModalSave]}>
					<div class="text-xl mb-5">{edit() ? 'Edit' : 'Tambah'} Data</div>
					<Select
						label="Jenis Aset"
						value={req().jenis}
						onChange={(e) => handleReq('jenis', e.currentTarget.value)}
						items={[
							{
								text: 'Pilih Jenis',
								value: '',
							},
							...jenis.map((item) => {
								return {
									text: item,
									value: item,
								};
							}),
						]}
					></Select>
					<Input
						label="Nama Aset"
						placeholder="Masukkan Nama Aset"
						value={req()?.nama}
						onInput={(e: any) => handleReq('nama', e.currentTarget.value)}
					></Input>
					<Input
						label="Pembelian Aset"
						placeholder="Masukkan Pembelian Aset"
						value={req()?.pembelian}
						onInput={(e: any) => handleReq('pembelian', e.currentTarget.value)}
					></Input>
					<Input
						label="Alokasi Dana"
						placeholder="Masukkan Alokasi Dana"
						value={req()?.alokasi_dana}
						onInput={(e: any) => handleReq('alokasi_dana', e.currentTarget.value)}
					></Input>
					<Input
						type="file"
						label="Bukti"
						title="Pilih Bukti"
						onChange={(e: any) => {
							readFile(e.currentTarget.files[0], (res: any) => {
								handleReq('buktiUrl', res);
							});
						}}
					></Input>
					<Select
						label="Status"
						value={req().status}
						onChange={(e) => handleReq('status', e.currentTarget.value)}
						items={[
							{
								text: 'Pilih Status',
								value: '',
							},
							{
								text: 'Milik Pribadi',
								value: '1',
							},
							{
								text: 'Milik Bersama',
								value: '2',
							},
						]}
					></Select>
					<div class="mt-10 text-right">
						<Button variant="primary" type="submit">
							Simpan
						</Button>
					</div>
				</Modal>
			</form>

			<form onSubmit={destroy}>
				<Modal model={[modalDelete, setModalDelete]}>
					<div>Anda yakin untuk menghapus aset terpilih?</div>
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

import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { showSnackbar } from '../lib';

export interface RiwayatAset {
	id?: number;
	jenis?: string;
	subjenis?: string;
	subsubjenis?: string;
	sumber_anggaran?: string;
	standarisasi_kebijakan?: string;
	sistem_pengadaan_aset?: string;
}
const data_jenis: any[] = [
	'Aset Properti',
	'Aset Transportasi',
	'Aset Bisnis & Investasi',
	'Aset Kesehatan',
	'Aset Pendidikan',
	'Aset ESTEBU',
	'Aset SDM',
];

const data_subjenis: {
	[key: string]: any[];
} = {
	'Aset Properti': ['Tanah', 'Bangunan'],
	'Aset Transportasi': [
		'Jaklingko',
		'LRT',
		'MRT',
		'Transjakarta',
		'Railink',
		'Computer Line',
		'Bus sekolah',
	],
	'Aset Bisnis & Investasi': ['DMPTSP', 'Restribusi', 'BUMD', 'Intensif', 'Statistik', 'LPSE'],
	'Aset Kesehatan': ['BPJS', 'Asuransi', 'KIS'],
	'Aset Pendidikan': ['BOS', 'Beasiswa', 'GNOTA'],
	'Aset ESTEBU': [
		'festival musik',
		'karnaval budaya',
		'Wisata kuliner',
		'Wisata bersejarah',
		'Topic branch 5',
	],
	'Aset SDM': [
		'Tenaga kerja terdidik',
		'Tenaga kerja terlatih',
		'Tenaga kerja tidak terlatih dan tidak terdidik',
		'Tenaga kerja rohani',
		'Topic Branch 5',
	],
};

const data_subsubjenis: {
	[key: string]: any[];
} = {
	Tanah: ['Tanah basah', 'Tanah kering', 'Tanah pertanian', 'Tanah perkebunan', 'Tanah tandus'],
	Bangunan: [
		'Bangunan tempat tinggal',
		'Bangunan industri',
		'Bangunan perkantoran',
		'Bangunan tempat ibadah',
	],
};

const data_sumber_anggaran: string[] = ['APBD', 'Non APBD'];

const data_standarisasi_kebijakan: string[] = [
	'Undang-undang',
	'Peraturan Pemerintah',
	'Peraturan Menteri',
	'Peraturan Gubernur',
	'Peraturan Daerah',
];

const data_sistem_pengadaan_aset: string[] = [
	'Direct procurement',
	'Tender pengadaan barang',
	'Request of proposal',
	'Request of quotation',
	'Vendor tunggal',
];

export default function () {
	const [data, setData] = createSignal<RiwayatAset[]>([]);
	const [req, setReq] = createSignal<RiwayatAset>({});
	const [loading, setLoading] = createSignal(false);
	const [modalSave, setModalSave] = createSignal(false);
	const [modalDelete, setModalDelete] = createSignal(false);
	const [edit, setEdit] = createSignal(false);

	function nullable() {
		setReq({
			sumber_anggaran: '',
		});
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
			<Header>Riwayat Aset</Header>
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
						headers={[
							'Jenis',
							'Sumber Anggaran',
							'Standarisasi Kebijakan',
							'Sistem Pengadaan Aset',
							'',
						]}
						items={data()?.map((item) => {
							return [
								<div>
									<div>{item.jenis}</div>
									<div class="text-xs text-gray-400">
										{item.subjenis} {item.subsubjenis ? `(${item.subsubjenis})` : ''}
									</div>
								</div>,
								item.sumber_anggaran,
								item.standarisasi_kebijakan,
								item.sistem_pengadaan_aset,
								<>
									<button
										class="text-primary mr-3"
										onClick={() => {
											setModalSave(true);
											setEdit(true);

											setReq({ ...item });

											setTimeout(() => {}, 1000);
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
					<Select
						label="Jenis Aset"
						value={req().jenis}
						onChange={(e) => {
							handleReq('jenis', e.currentTarget.value);
							handleReq('subjenis', '');
							handleReq('subsubjenis', '');
						}}
						items={[
							{
								text: 'Pilih Jenis',
								value: '',
							},
							...data_jenis.map((item) => {
								return {
									text: item,
									value: item,
								};
							}),
						]}
					></Select>
					<Show when={req().jenis}>
						<Select
							value={req().subjenis}
							onChange={(e: any) => {
								handleReq('subjenis', e.currentTarget.value);
								handleReq('subsubjenis', '');
							}}
						>
							<option value="">Pilih Jenis</option>
							<For each={data_subjenis[req().jenis as string]}>
								{(item) => <option value={item}>{item}</option>}
							</For>
						</Select>
					</Show>
					<Show when={req().subjenis == 'Tanah' || req().subjenis == 'Bangunan'}>
						<Select
							value={req().subsubjenis}
							onChange={(e: any) => handleReq('subsubjenis', e.currentTarget.value)}
						>
							<option value="">Pilih Jenis</option>
							<For each={data_subsubjenis[req().subjenis as string]}>
								{(item) => <option value={item}>{item}</option>}
							</For>
						</Select>
					</Show>
					<Select
						label="Sumber Anggaran"
						value={req().sumber_anggaran}
						items={[
							{
								text: 'Sumber Lainnya',
								value: req().sumber_anggaran as string,
							},
							...data_sumber_anggaran.map((item) => {
								return {
									text: item,
									value: item,
								};
							}),
						]}
						onChange={(e: any) => handleReq('sumber_anggaran', e.currentTarget.value)}
					></Select>
					<Show when={data_sumber_anggaran.indexOf(req().sumber_anggaran as string) < 0}>
						<Input
							value={req().sumber_anggaran}
							onInput={(e) => handleReq('sumber_anggaran', e.currentTarget.value)}
							placeholder="Lainnya"
						></Input>
					</Show>
					<Select
						label="Standarisasi Kebijakan"
						value={req().standarisasi_kebijakan}
						onChange={(e: any) => handleReq('standarisasi_kebijakan', e.currentTarget.value)}
						items={[
							{
								text: 'Pilih Standarisasi Kebijakan',
								value: '',
							},
							...data_standarisasi_kebijakan.map((item) => {
								return {
									text: item,
									value: item,
								};
							}),
						]}
					></Select>
					<Select
						label="Sistem Pengadaan Aset"
						value={req().sistem_pengadaan_aset}
						onChange={(e: any) => handleReq('sistem_pengadaan_aset', e.currentTarget.value)}
						items={[
							{
								text: 'Pilih Sistem Pengadaan Aset',
								value: '',
							},
							...data_sistem_pengadaan_aset.map((item) => {
								return {
									text: item,
									value: item,
								};
							}),
						]}
					></Select>
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
						Anda yakin untuk menghapus user <span class="font-semibold">{req().jenis}</span>?
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

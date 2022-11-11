import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import {
	Button,
	Card,
	Header,
	Input,
	Loading,
	Map,
	Modal,
	Select,
	Table,
	Textarea,
} from '../component';
import { showSnackbar } from '../lib';

export interface LokasiAset {
	id?: number;
	jenis_id?: number;
	jenis?: any;
	lokasi?: [string, string];
}

export default function (props: { jenis: string }) {
	const [data, setData] = createSignal<LokasiAset[]>([]);
	const [req, setReq] = createSignal<LokasiAset>({});
	const [loading, setLoading] = createSignal(false);
	const [modalSave, setModalSave] = createSignal(false);
	const [modalDelete, setModalDelete] = createSignal(false);
	const [modalMap, setModalMap] = createSignal(false);
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
				Lokasi Aset {props.jenis[0]}
				{props.jenis.slice(1).toLowerCase()}
			</Header>
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
						headers={['Jenis Aset', 'Lokasi', '', '']}
						items={data()?.map((item, index) => {
							return [
								`Aset ${index + 1}`,
								item.lokasi,
								<>
									<button
										class="text-primary text-sm bg-primary bg-opacity-10 px-3 p-1 rounded-full"
										onClick={() => {
											setReq({ ...item });
											setModalMap(true);
										}}
									>
										PREVIEW
									</button>
								</>,
								<>
									<button
										class="text-primary mr-3"
										onClick={() => {
											setReq({ ...item });
											setModalSave(true);
											setEdit(true);
											nullable();
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
				<Modal model={[modalSave, setModalSave]} width="lg:w-900px">
					<div class="text-xl mb-5">{edit() ? 'Edit' : 'Tambah'} Data</div>
					<Select
						label="Jenis Aset"
						value={req()?.jenis_id}
						onChange={(e: any) => handleReq('jenis_id', e.target.value)}
						items={[
							{
								text: 'Pilih Jenis Aset',
								value: '',
							},
							{
								text: 'Gedung Lantai 3',
								value: 1,
							},
							{
								text: 'Tanah Kavling',
								value: 2,
							},
						]}
					></Select>
					<div class="mb-4">
						<div class="mb-1">Lokasi</div>
						<Map
							id="map"
							class="h-300px"
							onSet={(e: any) => {
								handleReq('lokasi', [e.lat, e.lng]);
							}}
							marker={req().lokasi}
						></Map>
					</div>

					<div class="mt-10 text-right">
						<Button variant="primary" type="submit">
							Simpan
						</Button>
					</div>
				</Modal>
			</form>

			<form onSubmit={destroy}>
				<Modal model={[modalDelete, setModalDelete]}>
					<div>Anda yakin untuk lokasi aset terpilih?</div>
					<div class="mt-5 text-right">
						<Button variant="primary" type="submit">
							Hapus
						</Button>
					</div>
				</Modal>
			</form>

			<Modal model={[modalMap, setModalMap]} width="lg:w-900px">
				<div>
					<Map id="map" class="h-500px" click={false} marker={req().lokasi}></Map>
				</div>
			</Modal>
		</>
	);
}

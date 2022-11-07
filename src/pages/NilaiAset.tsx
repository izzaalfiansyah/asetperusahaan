import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { formatMoney, showSnackbar } from '../lib';

export interface NilaiAset {
	id?: number;
	jenis_id?: number;
	jenis?: any;
	nilai_penyusutan?: number;
	nilai_jual?: number;
	nilai_kontrak?: number;
	nilai_lelang?: number;
}

export default function () {
	const [data, setData] = createSignal<NilaiAset[]>([]);
	const [req, setReq] = createSignal<NilaiAset>({});
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
							nilai_penyusutan: 1000000,
							nilai_jual: 2000000,
							nilai_kontrak: 500000,
							nilai_lelang: 2500000,
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
			<Header>Nilai Aset</Header>
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
						headers={['Jenis Aset', 'Nilai', '']}
						items={data()?.map((item, index) => {
							return [
								`Aset ${index + 1}`,
								<>
									<table>
										<tbody>
											<tr>
												<td>Penyusutan</td>
												<td class="px-3">:</td>
												<td>{formatMoney(item.nilai_penyusutan)}</td>
											</tr>
											<tr>
												<td>Jual</td>
												<td class="px-3">:</td>
												<td>{formatMoney(item.nilai_jual)}</td>
											</tr>
											<tr>
												<td>Kontrak</td>
												<td class="px-3">:</td>
												<td>{formatMoney(item.nilai_kontrak)}</td>
											</tr>
											<tr>
												<td>Lelang</td>
												<td class="px-3">:</td>
												<td>{formatMoney(item.nilai_lelang)}</td>
											</tr>
										</tbody>
									</table>
								</>,
								<>
									<button
										class="text-primary mr-3"
										onClick={() => {
											setModalSave(true);
											setEdit(true);
											setReq({ ...item });
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
						value={req()?.jenis_id}
						onChange={(e: any) => handleReq('jenis_id', e.target.value)}
						items={[
							{
								text: 'Pilih Jenis Aset',
								value: '',
							},
							{
								text: 'Gedung Lantai 3',
								value: '1',
							},
							{
								text: 'Tanah Kavling',
								value: '2',
							},
						]}
					></Select>
					<Input
						type="number"
						min={0}
						label="Nilai Penyusutan"
						placeholder="Masukkan Nilai Penyusutan"
						value={req()?.nilai_penyusutan}
						onInput={(e: any) => handleReq('nilai_penyusutan', e.target.value)}
					></Input>
					<Input
						type="number"
						min={0}
						label="Nilai Jual"
						placeholder="Masukkan Nilai Jual"
						value={req()?.nilai_jual}
						onInput={(e: any) => handleReq('nilai_jual', e.target.value)}
					></Input>
					<Input
						type="number"
						min={0}
						label="Nilai Kontrak"
						placeholder="Masukkan Nilai Kontrak"
						value={req()?.nilai_kontrak}
						onInput={(e: any) => handleReq('nilai_kontrak', e.target.value)}
					></Input>
					<Input
						type="number"
						min={0}
						label="Nilai Lelang"
						placeholder="Masukkan Nilai Lelang"
						value={req()?.nilai_lelang}
						onInput={(e: any) => handleReq('nilai_lelang', e.target.value)}
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
					<div>Anda yakin untuk nilai aset terpilih?</div>
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

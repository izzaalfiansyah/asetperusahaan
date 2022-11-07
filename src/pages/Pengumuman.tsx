import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Modal, Select, Table, Textarea } from '../component';
import { readFile, showSnackbar } from '../lib';

export interface Pengumuman {
	id?: number;
	judul?: string;
	isi?: string;
	luas?: any;
	created_at?: string;
}

export default function () {
	const [data, setData] = createSignal<Pengumuman[]>([]);
	const [req, setReq] = createSignal<Pengumuman>({});
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
							judul: 'Pengumuman 1',
							isi: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam expedita sapiente, esse vel autem itaque! Quidem autem, optio praesentium aperiam, explicabo similique sapiente obcaecati odio iste quod adipisci dolore debitis.',
							created_at: '2022-10-28',
						},
						{
							id: 2,
							judul: 'Pengumuman 2',
							isi: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam expedita sapiente, esse vel autem itaque! Quidem autem, optio praesentium aperiam, explicabo similique sapiente obcaecati odio iste quod adipisci dolore debitis.',
							created_at: '2022-10-28',
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
				const dates = new Date();
				const date =
					dates.getFullYear() +
					'-' +
					((dates.getMonth() + 1 < 9 ? '0' : '') + (dates.getMonth() + 1)) +
					'-' +
					((dates.getDate() < 10 ? '0' : '') + dates.getDate());

				setTimeout(() => {
					setData((items: any) => {
						const item = { ...req(), id: data()?.length + 1, created_at: date };
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
			<Header>Data Pengumuman</Header>
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
				<For each={data()}>
					{(item) => (
						<div class="flex flex-row">
							<div class="w-1/5 flex justify-center -pb-4">
								<div class="h-full bg-white shadow w-1 rounded items-center flex">
									<div class="bg-primary px-5 py-1 text-white rounded-full whitespace-nowrap shadow transform lg:rotate-0 -rotate-90 -translate-x-[50%]">
										{item.created_at}
									</div>
								</div>
							</div>
							<div class="w-4/5">
								<Card>
									<div class="text-xl mb-3 text-shadow">{item.judul}</div>
									<div class="mb-3">{item.isi}</div>
									<div class="text-right">
										<button
											class="text-primary mr-3"
											onClick={() => {
												setModalSave(true);
												setEdit(true);
												setReq({ ...item, password: '' });
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
								</Card>
							</div>
						</div>
					)}
				</For>
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
						label="Judul"
						placeholder="Masukkan Judul"
						value={req()?.judul}
						onInput={(e: any) => handleReq('judul', e.target.value)}
					></Input>
					<Textarea
						label="Isi"
						placeholder="Masukkan Isi"
						value={req()?.isi}
						rows={6}
						onInput={(e: any) => handleReq('isi', e.target.value)}
					></Textarea>

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
						Anda yakin untuk menghapus pengumuman dengan judul{' '}
						<span class="font-semibold">{req().judul}</span>?
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

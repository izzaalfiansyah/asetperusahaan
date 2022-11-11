import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header, Loading } from '../../component';
import { KategoriAset } from './type';
import FormDestroy from './components/form-destroy';
import FormSave from './components/form-save';
import { getKategoriAset } from './service';

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
		const res = await getKategoriAset({ jenis: props.jenis });
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
			<>
				<Show when={!data().length}>
					<div class="bg-white rounded p-4 shadow">
						<div class="text-center">data tidak tersedia</div>
					</div>
				</Show>
				<div class="sm:grid-cols-2 grid-cols-1 grid gap-5 mb-5">
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
													nullable();
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
			</>
		);
	}

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
				<List />
				<Show when={loading()}>
					<Loading />
				</Show>
			</div>

			<FormSave
				callback={get}
				modal={[modalSave, setModalSave]}
				req={[req, setReq]}
				isEdit={edit()}
			/>

			<FormDestroy callback={get} modal={[modalDelete, setModalDelete]} req={[req, setReq]} />
		</>
	);
}

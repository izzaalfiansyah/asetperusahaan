import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header } from '../../component';
import FormDestroy from './components/form-destroy';
import FormSave from './components/form-save';
import { getPengumuman } from './service';
import { Pengumuman } from './type';

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
		const res = await getPengumuman();
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
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
		);
	}

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
				<List />
				<Show when={loading()}>
					<Card>
						<div class="text-center">Memuat...</div>
					</Card>
				</Show>
			</div>

			<FormSave
				callback={get}
				req={[req, setReq]}
				modal={[modalSave, setModalSave]}
				isEdit={edit()}
			/>

			<FormDestroy callback={get} req={[req, setReq]} modal={[modalDelete, setModalDelete]} />
		</>
	);
}

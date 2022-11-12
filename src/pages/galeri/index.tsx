import { FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, For, onMount, Show } from 'solid-js';
import { Button, Card, Header } from '../../component';
import FormDestroy from './components/form-destroy';
import FormSave from './components/form-save';
import { getGaleri } from './service';
import { Galeri } from './type';

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
		const res = await getGaleri();
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
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
										onClick={(e) => {
											e.preventDefault();
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
		);
	}

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

import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Loading, Table } from '../../component';
import DetailMap from './components/detail-map';
import FormDelete from './components/form-destroy';
import FormSave from './components/form-save';
import { getLokasiAset } from './service';
import { LokasiAset } from './type';

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
		const res = await getLokasiAset({ jenis: props.jenis });
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
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
		);
	}

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
					<List />
					<Show when={loading()}>
						<Loading />
					</Show>
				</div>
			</Card>

			<FormSave
				callback={get}
				modal={[modalSave, setModalSave]}
				req={[req, setReq]}
				isEdit={edit()}
			/>

			<FormDelete callback={get} req={[req, setReq]} modal={[modalDelete, setModalDelete]} />

			<DetailMap req={[req, setReq]} modal={[modalMap, setModalMap]} />
		</>
	);
}

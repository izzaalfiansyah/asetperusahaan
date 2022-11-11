import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Loading, Table } from '../../component';
import FormDestroy from './components/form-destroy';
import FormSave from './components/form-save';
import { getRiwayatAset } from './service';
import { RiwayatAset } from './type';

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
		const res = await getRiwayatAset();
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
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

									nullable();
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
		);
	}

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
					<List />
					<Show when={loading()}>
						<Loading />
					</Show>
				</div>
			</Card>

			<FormSave
				callback={get}
				isEdit={edit()}
				modal={[modalSave, setModalSave]}
				req={[req, setReq]}
			/>

			<FormDestroy callback={get} modal={[modalDelete, setModalDelete]} req={[req, setReq]} />
		</>
	);
}

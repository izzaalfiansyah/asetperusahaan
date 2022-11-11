import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Loading, Table } from '../../component';
import { formatMoney } from '../../lib';
import FormDestroy from './components/form-destroy';
import FormSave from './components/form-save';
import { getNilaiAset } from './service';
import { NilaiAset } from './type';

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
		const res = await getNilaiAset();
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
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
					<List />
					<Show when={loading()}>
						<Loading />
					</Show>
				</div>
			</Card>

			<FormSave
				callback={get}
				isEdit={edit()}
				req={[req, setReq]}
				modal={[modalSave, setModalSave]}
			/>

			<FormDestroy callback={get} req={[req, setReq]} modal={[modalDelete, setModalDelete]} />
		</>
	);
}

import { FaSolidPen, FaSolidPlus, FaSolidTrash } from 'solid-icons/fa';
import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Loading, Table } from '../../component';
import FormDestroy from './components/form-destroy';
import Formsave from './components/form-save';
import { getUser } from './service';
import { User } from './type';

export default function () {
	const [data, setData] = createSignal<User[]>([]);
	const [req, setReq] = createSignal<User>({});
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
		const res = await getUser();
		setData(res?.data);
		setLoading(false);
	}

	onMount(() => {
		get();
	});

	function List() {
		return (
			<Table
				headers={['Username', 'Nama', 'Telepon', 'Role', '']}
				items={data()?.map((item) => {
					return [
						item.username,
						item.nama,
						item.telepon,
						item.role,
						<>
							<button
								class="text-primary mr-3"
								onClick={() => {
									setModalSave(true);
									setEdit(true);
									nullable();
									setReq({ ...item, password: '' });
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
			<Header>Data User</Header>
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

			<Formsave
				callback={get}
				modal={[modalSave, setModalSave]}
				req={[req, setReq]}
				isEdit={edit()}
			/>

			<FormDestroy callback={get} modal={[modalDelete, setModalDelete]} req={[req, setReq]} />
		</>
	);
}

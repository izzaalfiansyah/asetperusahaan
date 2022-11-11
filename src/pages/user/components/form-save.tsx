import { Accessor, Show } from 'solid-js';
import { Button, Input, Modal, Select, Textarea } from '../../../component';
import { addUser, updateUser } from '../service';
import { User } from '../type';

interface Props {
	modal: [Accessor<boolean>, Function];
	isEdit: boolean;
	req: [Accessor<User>, Function];
	callback: Function;
}

export default (props: Props) => {
	const [req, setReq] = props.req;
	const [modal, setModal] = props.modal;

	function handleReq(key: string, value: any) {
		setReq((item: any) => {
			return { ...item, [key]: value };
		});
	}

	async function save(e: any) {
		e.preventDefault();

		if (props.isEdit) {
			await updateUser(req().id, req());
		} else {
			await addUser(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={props.modal}>
				<div class="text-xl mb-5">{props.isEdit ? 'Edit' : 'Tambah'} Data</div>
				<Input
					label="Nama"
					placeholder="Masukkan Nama"
					value={req().nama}
					onInput={(e: any) => handleReq('nama', e.target.value)}
				></Input>
				<Input
					type="tel"
					label="Telepon"
					placeholder="Masukkan Telepon"
					value={req().telepon}
					onInput={(e: any) => handleReq('telepon', e.target.value)}
				></Input>
				<Textarea
					label="Alamat"
					placeholder="Masukkan Alamat"
					value={req().alamat}
					onInput={(e: any) => handleReq('alamat', e.target.value)}
				></Textarea>
				<Select
					label="Role"
					value={req().role}
					onChange={(e: any) => handleReq('role', e.target.value)}
					items={[
						{
							text: 'Pilih Role',
							value: '',
						},
						{
							text: 'Superadmin',
							value: '1',
						},
						{
							text: 'User',
							value: '2',
						},
					]}
				></Select>
				<Input
					label="Username"
					placeholder="Masukkan Username"
					value={req().username}
					onInput={(e: any) => handleReq('username', e.target.value)}
				></Input>
				<Input
					label="Password"
					type="password"
					placeholder="Masukkan Password"
					value={req().password}
					onInput={(e: any) => handleReq('password', e.target.value)}
				></Input>
				<Show when={props.isEdit}>
					<div class="text-xs -mt-3 text-gray-400">
						Kosongkan jika tidak ingin mengganti password.
					</div>
				</Show>

				<div class="mt-10 text-right">
					<Button variant="primary" type="submit">
						Simpan
					</Button>
				</div>
			</Modal>
		</form>
	);
};

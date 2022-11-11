import { Accessor } from 'solid-js';
import { Button, Modal } from '../../../component';
import { deleteUser } from '../service';
import { User } from '../type';

interface Props {
	modal: [Accessor<boolean>, Function];
	req: [Accessor<User>, Function];
	callback: Function;
}

export default (props: Props) => {
	const [req, setReq] = props.req;
	const [modal, setModal] = props.modal;

	async function destroy(e: any) {
		e.preventDefault();
		await deleteUser(req().id);
		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={destroy}>
			<Modal model={props.modal}>
				<div>
					Anda yakin untuk menghapus user <span class="font-semibold">{req().nama}</span>?
				</div>
				<div class="mt-5 text-right">
					<Button variant="primary" type="submit">
						Hapus
					</Button>
				</div>
			</Modal>
		</form>
	);
};

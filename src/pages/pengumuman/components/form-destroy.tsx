import { Accessor } from 'solid-js';
import { Button, Modal } from '../../../component';
import { deletePengumuman } from '../service';
import { Pengumuman } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<Pengumuman>, Function];
	modal: [Accessor<boolean>, Function];
}

export default (props: Props) => {
	const [req, setReq] = props.req;
	const [modal, setModal] = props.modal;

	async function destroy(e: any) {
		e.preventDefault();
		await deletePengumuman(req().id);
		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={destroy}>
			<Modal model={props.modal}>
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
	);
};

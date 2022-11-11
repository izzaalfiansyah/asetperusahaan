import { Accessor } from 'solid-js';
import { Button, Modal } from '../../../component';
import { deleteNilaiAset } from '../service';
import { NilaiAset } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<NilaiAset>, Function];
	modal: [Accessor<boolean>, Function];
}

export default (props: Props) => {
	const [req, setReq] = props.req;
	const [modal, setModal] = props.modal;

	async function destroy(e: any) {
		e.preventDefault();
		await deleteNilaiAset(req().id);
		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={destroy}>
			<Modal model={props.modal}>
				<div>Anda yakin untuk nilai aset terpilih?</div>
				<div class="mt-5 text-right">
					<Button variant="primary" type="submit">
						Hapus
					</Button>
				</div>
			</Modal>
		</form>
	);
};

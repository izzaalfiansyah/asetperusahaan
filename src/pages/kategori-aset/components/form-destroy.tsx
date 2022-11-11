import { Accessor } from 'solid-js';
import { Button, Modal } from '../../../component';
import { deleteKategoriAset } from '../service';
import { KategoriAset } from '../type';

interface Props {
	callback: Function;
	modal: [Accessor<boolean>, Function];
	req: [Accessor<KategoriAset>, Function];
}

export default (props: Props) => {
	const [modal, setModal] = props.modal;
	const [req, setReq] = props.req;

	async function destroy(e: any) {
		e.preventDefault();
		await deleteKategoriAset(req().id);
		setModal(false);
	}

	return (
		<form onSubmit={destroy}>
			<Modal model={props.modal}>
				<div>Anda yakin untuk menghapus aset terpilih?</div>
				<div class="mt-5 text-right">
					<Button variant="primary" type="submit">
						Hapus
					</Button>
				</div>
			</Modal>
		</form>
	);
};

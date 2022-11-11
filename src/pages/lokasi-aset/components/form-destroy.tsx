import { Accessor } from 'solid-js';
import { Button, Modal } from '../../../component';
import { NilaiAset } from '../../nilai-aset/type';
import { deleteLokasiAset } from '../service';

interface Props {
	callback: Function;
	req: [Accessor<NilaiAset>, Function];
	modal: [Accessor<boolean>, Function];
}

export default (props: Props) => {
	const [modal, setModal] = props.modal;
	const [req, setReq] = props.req;

	async function destroy(e: any) {
		e.preventDefault();
		await deleteLokasiAset(req().id);
		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={destroy}>
			<Modal model={props.modal}>
				<div>Anda yakin untuk lokasi aset terpilih?</div>
				<div class="mt-5 text-right">
					<Button variant="primary" type="submit">
						Hapus
					</Button>
				</div>
			</Modal>
		</form>
	);
};

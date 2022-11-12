import { Accessor } from 'solid-js';
import { Button, Input, Modal } from '../../../component';
import { readFile } from '../../../lib';
import { addGaleri, updateGaleri } from '../service';
import { Galeri } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<Galeri>, Function];
	modal: [Accessor<boolean>, Function];
	isEdit: boolean;
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
			await updateGaleri(req().id, req());
		} else {
			await addGaleri(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={props.modal}>
				<div class="text-xl mb-5">{props.isEdit ? 'Edit' : 'Tambah'} Data</div>
				<Input
					type="file"
					label="Foto"
					title="Pilih Foto"
					onChange={(e: any) => {
						readFile(e.target.files[0], (res: any) => {
							handleReq('fotoUrl', res);
						});
					}}
				></Input>

				<div class="mt-10 text-right">
					<Button variant="primary" type="submit">
						Simpan
					</Button>
				</div>
			</Modal>
		</form>
	);
};

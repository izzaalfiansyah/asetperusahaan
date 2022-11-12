import { Accessor } from 'solid-js';
import { Button, Input, Modal, Textarea } from '../../../component';
import { addPengumuman, updatePengumuman } from '../service';
import { Pengumuman } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<Pengumuman>, Function];
	modal: [Accessor<boolean>, Function];
	isEdit: boolean;
}

export default (props: Props) => {
	const [req, setReq] = props.req;
	const [modal, setModal] = props.modal;

	function handleReq(key: string, value: any) {
		return setReq((item: any) => {
			return { ...item, [key]: value };
		});
	}

	async function save(e: any) {
		e.preventDefault();

		if (props.isEdit) {
			await updatePengumuman(req().id, req());
		} else {
			await addPengumuman(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={props.modal}>
				<div class="text-xl mb-5">{props.isEdit ? 'Edit' : 'Tambah'} Data</div>
				<Input
					label="Judul"
					placeholder="Masukkan Judul"
					value={req()?.judul}
					onInput={(e: any) => handleReq('judul', e.target.value)}
				></Input>
				<Textarea
					label="Isi"
					placeholder="Masukkan Isi"
					value={req()?.isi}
					rows={6}
					onInput={(e: any) => handleReq('isi', e.target.value)}
				></Textarea>

				<div class="mt-10 text-right">
					<Button variant="primary" type="submit">
						Simpan
					</Button>
				</div>
			</Modal>
		</form>
	);
};

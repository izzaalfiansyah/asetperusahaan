import { Accessor } from 'solid-js';
import { Button, Input, Modal, Select } from '../../../component';
import { addNilaiAset, updateNilaiAset } from '../service';
import { NilaiAset } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<NilaiAset>, Function];
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
			await updateNilaiAset(req().id, req());
		} else {
			await addNilaiAset(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={props.modal}>
				<div class="text-xl mb-5">{props.isEdit ? 'Edit' : 'Tambah'} Data</div>
				<Select
					label="Jenis Aset"
					value={req()?.jenis_id}
					onChange={(e: any) => handleReq('jenis_id', e.target.value)}
					items={[
						{
							text: 'Pilih Jenis Aset',
							value: '',
						},
						{
							text: 'Gedung Lantai 3',
							value: '1',
						},
						{
							text: 'Tanah Kavling',
							value: '2',
						},
					]}
				></Select>
				<Input
					type="number"
					min={0}
					label="Nilai Penyusutan"
					placeholder="Masukkan Nilai Penyusutan"
					value={req()?.nilai_penyusutan}
					onInput={(e: any) => handleReq('nilai_penyusutan', e.target.value)}
				></Input>
				<Input
					type="number"
					min={0}
					label="Nilai Jual"
					placeholder="Masukkan Nilai Jual"
					value={req()?.nilai_jual}
					onInput={(e: any) => handleReq('nilai_jual', e.target.value)}
				></Input>
				<Input
					type="number"
					min={0}
					label="Nilai Kontrak"
					placeholder="Masukkan Nilai Kontrak"
					value={req()?.nilai_kontrak}
					onInput={(e: any) => handleReq('nilai_kontrak', e.target.value)}
				></Input>
				<Input
					type="number"
					min={0}
					label="Nilai Lelang"
					placeholder="Masukkan Nilai Lelang"
					value={req()?.nilai_lelang}
					onInput={(e: any) => handleReq('nilai_lelang', e.target.value)}
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

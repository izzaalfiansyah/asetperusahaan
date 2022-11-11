import { Accessor } from 'solid-js';
import { Button, Map, Modal, Select } from '../../../component';
import { addLokasiAset, updateLokasiAset } from '../service';
import { LokasiAset } from '../type';

interface Props {
	callback: Function;
	req: [Accessor<LokasiAset>, Function];
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
			await updateLokasiAset(req().id, req());
		} else {
			await addLokasiAset(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={props.modal} width="lg:w-900px">
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
							value: 1,
						},
						{
							text: 'Tanah Kavling',
							value: 2,
						},
					]}
				></Select>
				<div class="mb-4">
					<div class="mb-1">Lokasi</div>
					<Map
						id="map"
						class="h-300px"
						onSet={(e: any) => {
							handleReq('lokasi', [e.lat, e.lng]);
						}}
						marker={req().lokasi}
					></Map>
				</div>

				<div class="mt-10 text-right">
					<Button variant="primary" type="submit">
						Simpan
					</Button>
				</div>
			</Modal>
		</form>
	);
};

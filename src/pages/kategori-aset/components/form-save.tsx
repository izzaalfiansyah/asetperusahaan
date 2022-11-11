import { Accessor } from 'solid-js';
import { Button, Input, Modal, Select } from '../../../component';
import { readFile } from '../../../lib';
import { addKategoriAset, updateKategoriAset } from '../service';
import { KategoriAset } from '../type';
import { jenis } from '../utils';

interface Props {
	modal: [Accessor<boolean>, Function];
	req: [Accessor<KategoriAset>, Function];
	isEdit: boolean;
	callback: Function;
}

export default (props: Props) => {
	const [modal, setModal] = props.modal;
	const [req, setReq] = props.req;

	function handleReq(key: string, value: any) {
		setReq((item: any) => {
			return { ...item, [key]: value };
		});
	}

	async function save(e: any) {
		e.preventDefault();

		if (props.isEdit) {
			await updateKategoriAset(req().id, req());
		} else {
			await addKategoriAset(req());
		}

		props.callback();
		setModal(false);
	}

	return (
		<form onSubmit={save}>
			<Modal model={[modal, setModal]}>
				<div class="text-xl mb-5">{props.isEdit ? 'Edit' : 'Tambah'} Data</div>
				<Select
					label="Jenis Aset"
					value={req().jenis}
					onChange={(e) => handleReq('jenis', e.currentTarget.value)}
					items={[
						{
							text: 'Pilih Jenis',
							value: '',
						},
						...jenis.map((item) => {
							return {
								text: item,
								value: item,
							};
						}),
					]}
				></Select>
				<Input
					label="Nama Aset"
					placeholder="Masukkan Nama Aset"
					value={req()?.nama}
					onInput={(e: any) => handleReq('nama', e.currentTarget.value)}
				></Input>
				<Input
					label="Pembelian Aset"
					placeholder="Masukkan Pembelian Aset"
					value={req()?.pembelian}
					onInput={(e: any) => handleReq('pembelian', e.currentTarget.value)}
				></Input>
				<Input
					label="Alokasi Dana"
					placeholder="Masukkan Alokasi Dana"
					value={req()?.alokasi_dana}
					onInput={(e: any) => handleReq('alokasi_dana', e.currentTarget.value)}
				></Input>
				<Input
					type="file"
					label="Bukti"
					title="Pilih Bukti"
					onChange={(e: any) => {
						readFile(e.currentTarget.files[0], (res: any) => {
							handleReq('buktiUrl', res);
						});
					}}
				></Input>
				<Select
					label="Status"
					value={req().status}
					onChange={(e) => handleReq('status', e.currentTarget.value)}
					items={[
						{
							text: 'Pilih Status',
							value: '',
						},
						{
							text: 'Milik Pribadi',
							value: '1',
						},
						{
							text: 'Milik Bersama',
							value: '2',
						},
					]}
				></Select>
				<div class="mt-10 text-right">
					<Button variant="primary" type="submit">
						Simpan
					</Button>
				</div>
			</Modal>
		</form>
	);
};

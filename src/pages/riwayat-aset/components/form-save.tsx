import { Accessor, For, Show } from 'solid-js';
import { Button, Input, Modal, Select } from '../../../component';
import { addRiwayatAset, updateRiwayatAset } from '../service';
import { RiwayatAset } from '../type';
import {
	data_jenis,
	data_sistem_pengadaan_aset,
	data_standarisasi_kebijakan,
	data_subjenis,
	data_subsubjenis,
	data_sumber_anggaran,
} from '../utils';

interface Props {
	modal: [Accessor<boolean>, Function];
	isEdit: boolean;
	req: [Accessor<RiwayatAset>, Function];
	callback: Function;
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
			await updateRiwayatAset(req().id, req());
		} else {
			await addRiwayatAset(req());
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
					value={req().jenis}
					onChange={(e) => {
						handleReq('jenis', e.currentTarget.value);
						handleReq('subjenis', '');
						handleReq('subsubjenis', '');
					}}
					items={[
						{
							text: 'Pilih Jenis',
							value: '',
						},
						...data_jenis.map((item) => {
							return {
								text: item,
								value: item,
							};
						}),
					]}
				></Select>
				<Show when={req().jenis}>
					<Select
						value={req().subjenis}
						onChange={(e: any) => {
							handleReq('subjenis', e.currentTarget.value);
							handleReq('subsubjenis', '');
						}}
					>
						<option value="">Pilih Jenis</option>
						<For each={data_subjenis[req().jenis as string]}>
							{(item) => <option value={item}>{item}</option>}
						</For>
					</Select>
				</Show>
				<Show when={req().subjenis == 'Tanah' || req().subjenis == 'Bangunan'}>
					<Select
						value={req().subsubjenis}
						onChange={(e: any) => handleReq('subsubjenis', e.currentTarget.value)}
					>
						<option value="">Pilih Jenis</option>
						<For each={data_subsubjenis[req().subjenis as string]}>
							{(item) => <option value={item}>{item}</option>}
						</For>
					</Select>
				</Show>
				<Select
					label="Sumber Anggaran"
					value={req().sumber_anggaran}
					items={[
						{
							text: 'Sumber Lainnya',
							value: req().sumber_anggaran as string,
						},
						...data_sumber_anggaran.map((item) => {
							return {
								text: item,
								value: item,
							};
						}),
					]}
					onChange={(e: any) => handleReq('sumber_anggaran', e.currentTarget.value)}
				></Select>
				<Show when={data_sumber_anggaran.indexOf(req().sumber_anggaran as string) < 0}>
					<Input
						value={req().sumber_anggaran}
						onInput={(e) => handleReq('sumber_anggaran', e.currentTarget.value)}
						placeholder="Lainnya"
					></Input>
				</Show>
				<Select
					label="Standarisasi Kebijakan"
					value={req().standarisasi_kebijakan}
					onChange={(e: any) => handleReq('standarisasi_kebijakan', e.currentTarget.value)}
					items={[
						{
							text: 'Pilih Standarisasi Kebijakan',
							value: '',
						},
						...data_standarisasi_kebijakan.map((item) => {
							return {
								text: item,
								value: item,
							};
						}),
					]}
				></Select>
				<Select
					label="Sistem Pengadaan Aset"
					value={req().sistem_pengadaan_aset}
					onChange={(e: any) => handleReq('sistem_pengadaan_aset', e.currentTarget.value)}
					items={[
						{
							text: 'Pilih Sistem Pengadaan Aset',
							value: '',
						},
						...data_sistem_pengadaan_aset.map((item) => {
							return {
								text: item,
								value: item,
							};
						}),
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

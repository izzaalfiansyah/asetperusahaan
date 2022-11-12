import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Textarea } from '../../component';
import { showSnackbar } from '../../lib';
import { getPengaturan, updatePengaturan } from './service';
import { Pengaturan } from './type';

export default function () {
	const [req, setReq] = createSignal<Pengaturan>({});
	const [loading, setLoading] = createSignal(false);

	function handleReq(key: string, value: any) {
		setReq((item) => {
			return { ...item, [key]: value };
		});
	}

	async function get() {
		await setLoading(true);
		const res = await getPengaturan();
		setReq(res?.data);
		setLoading(false);
	}

	async function update(e: any) {
		e.preventDefault();
		await updatePengaturan(req());
		showSnackbar('data berhasil disimpan');
	}

	onMount(() => {
		get();
	});

	return (
		<form onSubmit={update}>
			<Header>Pengaturan</Header>
			<Card>
				<div class="relative">
					<Show when={loading()}>
						<Loading />
					</Show>

					<Input
						label="Nama Perusahaan"
						placeholder="Masukkan Nama Perusahaan"
						value={req().nama}
						onInput={(e: any) => handleReq('nama', e.target.value)}
					></Input>
					<Input type="file" label="Logo" title="Pilih Logo"></Input>
					<Textarea
						rows={4}
						label="Nama Sejarah"
						placeholder="Masukkan Sejarah"
						value={req().sejarah}
						onInput={(e: any) => handleReq('sejarah', e.target.value)}
					></Textarea>
					<Textarea
						rows={4}
						label="Nama Visi"
						placeholder="Masukkan Visi"
						value={req().visi}
						onInput={(e: any) => handleReq('visi', e.target.value)}
					></Textarea>
					<Textarea
						rows={4}
						label="Nama Misi"
						placeholder="Masukkan Misi"
						value={req().misi}
						onInput={(e: any) => handleReq('misi', e.target.value)}
					></Textarea>
					<div class="mt-10">
						<Button variant="primary" type="submit">
							Simpan Data
						</Button>
					</div>
				</div>
			</Card>
		</form>
	);
}

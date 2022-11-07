import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Textarea } from '../component';
import { showSnackbar } from '../lib';

export interface Perusahaan {
	nama?: string;
	logo?: string;
	sejarah?: string;
	visi?: string;
	misi?: string;
}

export default function () {
	const [req, setReq] = createSignal<Perusahaan>({});
	const [loading, setLoading] = createSignal(false);

	function handleReq(key: string, value: any) {
		setReq((item) => {
			return { ...item, [key]: value };
		});
	}

	async function get() {
		await setLoading(true);
		await new Promise((resolve) => {
			setTimeout(() => {
				setReq({
					nama: 'e-aset',
					logo: '',
					sejarah:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
					visi: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
					misi: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nihil blanditiis, beatae consequatur enim cum nam numquam! Exercitationem voluptas magnam rem fuga, eius laborum ratione. Eius voluptatum architecto nostrum deserunt.',
				});
				resolve(true);
			}, 500);
		});
		setLoading(false);
	}

	async function update(e: any) {
		e.preventDefault();
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

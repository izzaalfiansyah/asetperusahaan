import { createSignal, onMount, Show } from 'solid-js';
import { Button, Card, Header, Input, Loading, Textarea } from '../../component';
import { auth, showSnackbar } from '../../lib';
import { findUser, updateUser } from '../user/service';
import { User } from '../user/type';

export default function () {
	const [req, setReq] = createSignal<User>({});
	const [loading, setLoading] = createSignal(false);
	const userId = auth.id;

	function handleReq(key: string, value: any) {
		setReq((item) => {
			return { ...item, [key]: value };
		});
	}

	async function get() {
		await setLoading(true);
		const res = await findUser(userId);
		setReq(res?.data);
		setLoading(false);
	}

	async function update(e: any) {
		e.preventDefault();
		await updateUser(userId, req());
		showSnackbar('data berhasil disimpan');
	}

	onMount(() => {
		get();
	});

	return (
		<form onSubmit={update}>
			<Header>Akun</Header>
			<Card>
				<div class="relative">
					<Show when={loading()}>
						<Loading />
					</Show>

					<Input
						label="Nama"
						placeholder="Masukkan Nama"
						value={req().nama}
						onInput={(e: any) => handleReq('nama', e.target.value)}
					></Input>
					<Input
						label="Nomor Telepon"
						placeholder="Masukkan Nomor Telepon"
						value={req().telepon}
						onInput={(e: any) => handleReq('telepon', e.target.value)}
					></Input>
					<Textarea
						label="Nama Alamat"
						placeholder="Masukkan Alamat"
						value={req().alamat}
						onInput={(e: any) => handleReq('alamat', e.target.value)}
					></Textarea>
					<Input
						label="Username"
						placeholder="Masukkan Username"
						value={req().username}
						onInput={(e: any) => handleReq('username', e.target.value)}
					></Input>
					<Input
						type="password"
						label="Password"
						placeholder="Masukkan Password"
						value={req().password}
						onInput={(e: any) => handleReq('password', e.target.value)}
					></Input>
					<div class="text-xs text-gray-400 -mt-3">
						Kosongkan jika tidak ingin mengganti password
					</div>
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

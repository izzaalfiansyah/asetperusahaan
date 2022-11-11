import { Route, Routes } from '@solidjs/router';
import Akun from '../pages/akun';
import KategoriAset from '../pages/kategori-aset';
import Dashboard from '../pages/dashboard';
import RiwayatAset from '../pages/riwayat-aset';
import Galeri from '../pages/Galeri';
import Pengaturan from '../pages/Pengaturan';
import Pengumuman from '../pages/Pengumuman';
import User from '../pages/user';
import NilaiAset from '../pages/nilai-aset';
import LokasiAset from '../pages/lokasi-aset';

export default function () {
	return (
		<Routes>
			<Route path="/" component={Dashboard}></Route>
			<Route path="/user" component={User}></Route>
			<Route path="/aset-pemda" component={() => <KategoriAset jenis="PEMDA" />}></Route>
			<Route path="/aset-pemprov" component={() => <KategoriAset jenis="PEMPROV" />}></Route>
			<Route path="/riwayat-aset" component={RiwayatAset}></Route>
			<Route path="/nilai-aset" component={NilaiAset}></Route>
			<Route
				path="/lokasi-aset"
				component={() => (
					<>
						<LokasiAset jenis="PEMDA" />
						<LokasiAset jenis="PEMPROV" />
					</>
				)}
			></Route>
			<Route
				path="/rekap-aset"
				component={() => (
					<>
						<KategoriAset jenis="PEMDA" />
						<KategoriAset jenis="PEMPROV" />
					</>
				)}
			></Route>
			<Route path="/pengumuman" component={Pengumuman}></Route>
			<Route path="/galeri" component={Galeri}></Route>
			<Route path="/pengaturan" component={Pengaturan}></Route>
			<Route path="/akun" component={Akun}></Route>
		</Routes>
	);
}

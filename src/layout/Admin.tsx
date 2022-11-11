import { createSignal, For, Show } from 'solid-js';
import {
	FaBrandsBuffer,
	FaSolidBarsStaggered,
	FaSolidChevronLeft,
	FaSolidUser,
	FaSolidDoorOpen,
	FaSolidPhotoFilm,
	FaSolidChevronRight,
	FaSolidBeerMugEmpty,
	FaSolidHourglassEmpty,
} from 'solid-icons/fa';
import { Button, Card, Footer, Modal } from '../component';
import Router from '../router';
import { NavLink, useLocation, useNavigate } from '@solidjs/router';

export default function () {
	const menus = [
		{
			path: '/',
			title: 'Dashboard',
			icon: <FaBrandsBuffer class="fill-gray-500" size={18} />,
		},
		// {
		// 	path: '/user',
		// 	title: 'Data User',
		// 	icon: <FaSolidUsersLine class="fill-gray-500" size={18} />,
		// },
		{
			path: '#',
			title: 'Kategori Aset',
			icon: <FaSolidPhotoFilm class="fill-gray-500" size={18} />,
			children: [
				{
					title: 'Aset Pemda',
					path: '/aset-pemda',
				},
				{
					title: 'Aset Pemprov',
					path: '/aset-pemprov',
				},
			],
		},
		{
			path: '#',
			title: 'Kualifikasi Aset',
			icon: <FaSolidBeerMugEmpty class="fill-gray-500" size={18} />,
			children: [
				{
					title: 'Riwayat Aset',
					path: '/riwayat-aset',
				},
				{
					title: 'Nilai Aset',
					path: '/nilai-aset',
				},
			],
		},
		{
			path: '#',
			title: 'Analisis Bukti Aset',
			icon: <FaSolidHourglassEmpty class="fill-gray-500" size={18} />,
			children: [
				{
					title: 'Lokasi Aset',
					path: '/lokasi-aset',
				},
				{
					title: 'Rekap Aset',
					path: '/rekap-aset',
				},
			],
		},
		// {
		// 	path: '/pengumuman',
		// 	title: 'Data Pengumuman',
		// 	icon: <FaSolidTableList class="fill-gray-500" size={18} />,
		// },
		// {
		// 	path: '/galeri',
		// 	title: 'Data Galeri',
		// 	icon: <FaSolidArchway class="fill-gray-500" size={18} />,
		// },
		// {
		// 	path: '/pengaturan',
		// 	title: 'Pengaturan',
		// 	icon: <FaSolidCode class="fill-gray-500" size={18} />,
		// },
	];

	const location = useLocation();

	const [sidebarOpen, setSidebarOpen] = createSignal(false);
	const [modalLogout, setModalLogout] = createSignal(false);
	const navigate = useNavigate();

	function toggleSidebar() {
		setSidebarOpen(!sidebarOpen());
	}

	function ItemNav(item: {
		title: string;
		path: string;
		icon: any;
		onClick?: any;
		children?: any[];
	}) {
		return item.children ? (
			<a
				href="#"
				class="px-5 relative block text-gray-500"
				classList={{
					open: JSON.stringify(item.children).indexOf(`"path":"${location.pathname}"`) > 0,
				}}
			>
				<div
					onClick={(e) => {
						e.preventDefault();
						document.querySelectorAll('#sidebar a').forEach((el) => {
							if (el !== e.currentTarget.parentElement) {
								el.classList.remove('open');
							}
						});
						e.currentTarget.parentElement?.classList.toggle('open');
					}}
					class="p-2.5 px-4 flex items-center rounded-lg transition mb-1 hover:bg-gray-50 justify-between"
				>
					<Show when={JSON.stringify(item.children).indexOf(`"path":"${location.pathname}"`) > 0}>
						<div class="absolute top-0 bottom-0 right-0 p-0.5 bg-primary rounded-l"></div>
					</Show>
					<div class="flex items-center">
						<div class="w-7 mr-2 text-primary flex items-center justify-center">{item.icon}</div>
						{item.title}
					</div>
					<div>
						<FaSolidChevronRight class="sub-icon transition" size={12} />
					</div>
				</div>
				<div class="sub-menu transition h-0 opacity-0">
					<For each={item.children}>
						{(subitem) => (
							<NavLink href={subitem.path}>
								<div
									class="p-2.5 px-4 flex items-center rounded-lg transition mb-1 hover:bg-gray-50 justify-between"
									classList={{
										'font-semibold !bg-primary !bg-opacity-16 text-primary':
											subitem.path == location.pathname,
									}}
								>
									<div class="flex items-center">
										<div class="w-7 mr-2"></div>
										{subitem.title}
									</div>
								</div>
							</NavLink>
						)}
					</For>
				</div>
			</a>
		) : (
			<NavLink
				onClick={(e) => {
					e.preventDefault();
					if (item.onClick) {
						item.onClick();
					} else {
						document.querySelectorAll('#sidebar a').forEach((el) => {
							if (el !== e.currentTarget.parentElement) {
								el.classList.remove('open');
							}
						});
						toggleSidebar();
					}
				}}
				href={item.path}
				class="px-5 relative block text-gray-500"
			>
				<Show when={item.path == location.pathname}>
					<div class="absolute top-0 bottom-0 right-0 p-0.5 bg-primary rounded-l"></div>
				</Show>
				<div
					class="p-2.5 px-4 flex rounded-lg transition mb-1 hover:bg-gray-50"
					classList={{
						'font-semibold !bg-primary !bg-opacity-16 text-primary': item.path == location.pathname,
					}}
				>
					<div class="w-7 mr-2 text-primary flex items-center justify-center">{item.icon}</div>
					{item.title}
				</div>
			</NavLink>
		);
	}

	async function logout(e: any) {
		e.preventDefault();
		await new Promise((resolve) => {
			navigate('/');
			setTimeout(() => {
				localStorage.removeItem('id');
				localStorage.removeItem('role');
				resolve(true);
			}, 400);
		});
		window.location.href = window.location.origin + window.location.pathname;
	}

	return (
		<div class="min-h-screen bg-back">
			<div
				class="z-19 bg-black bg-opacity-25 fixed top-0 left-0 right-0 bottom-0 !lg:hidden"
				classList={{ hidden: !sidebarOpen() }}
				onClick={toggleSidebar}
			></div>
			<div
				class="bg-white fixed top-0 left-0 bottom-0 w-270px z-20 shadow transition transform -translate-x-full !lg:translate-x-0 flex flex-col justify-between overflow-x-hidden overflow-y-auto"
				classList={{ '!translate-x-0': sidebarOpen() }}
				id="sidebar"
			>
				<div>
					<div class="flex relative items-center h-80px px-10 lg:justify-center justify-between">
						<div class="text-3xl font-bold text-gray-600">
							<span class="text-primary">e-</span>
							<span>aset</span>
						</div>
						<button
							class="bg-primary rounded-full text-white flex items-center justify-center w-10 h-10 border-6 border-gray-100 transform translate-x-[20px] !lg:hidden"
							classList={{ hidden: !sidebarOpen() }}
							onClick={toggleSidebar}
						>
							<FaSolidChevronLeft class="fill-white" />
						</button>
					</div>
					<div class="pb-6">
						<For each={menus}>{(item) => ItemNav(item)}</For>

						{ItemNav({
							title: 'Akun',
							path: '/akun',
							icon: <FaSolidUser class="fill-gray-500" />,
						})}
						{ItemNav({
							title: 'Logout',
							path: '/logout',
							icon: <FaSolidDoorOpen class="fill-gray-500" />,
							onClick: () => {
								setModalLogout(true);
							},
						})}
					</div>
				</div>
			</div>

			<div class="lg:pl-270px min-h-screen flex flex-col justify-between">
				<div class="lg:px-6 px-4 py-3">
					<Card>
						<div class="flex items-center justify-between px-2">
							<button onClick={toggleSidebar} class="lg:hidden">
								<FaSolidBarsStaggered class="fill-gray-500" size={19} />
							</button>
							<div></div>
							<NavLink href="/akun" class="flex items-center justify-end text-gray-500">
								<div class="rounded-full w-10 h-10 bg-gray-100 lg:mr-3"></div>
								<div class="hidden !lg:block">Superadmin</div>
							</NavLink>
						</div>
					</Card>

					<main>
						<Router></Router>
					</main>
				</div>
				<div class="lg:px-6 px-4 py-5">
					<Footer />
				</div>
			</div>

			<form onSubmit={logout}>
				<Modal model={[modalLogout, setModalLogout]}>
					<div class="text-xl mb-5">Logout</div>
					<div>Anda yakin akan keluar? Sesi anda akan terhapus!</div>
					<div class="mt-5 text-right">
						<Button type="submit" variant="primary">
							Keluar
						</Button>
					</div>
				</Modal>
			</form>
		</div>
	);
}

import { createSignal } from 'solid-js';
import { Button, Card, Footer, Input } from '../component';
import { showSnackbar } from '../lib';

export default function () {
	const [req, setReq] = createSignal<{
		username?: string;
		password?: string;
	}>({});

	async function login(e: any) {
		e.preventDefault();
		await new Promise((resolve) => {
			setTimeout(() => {
				localStorage.setItem('id', '1');
				localStorage.setItem('role', '1');
				showSnackbar('berhasil login');
				resolve(true);
			}, 500);
		});
		window.location.href = window.location.origin + window.location.pathname;
	}

	function handleReq(key: string, value: any) {
		setReq((item) => {
			return { ...item, [key]: value };
		});
	}

	return (
		<main class="min-h-screen bg-back p-5 flex items-center justify-center">
			<form onSubmit={login} class="w-full lg:w-400px relative">
				<img
					src="data:image/svg+xml,%3Csvg width='148px' height='148px' viewBox='0 0 148 148' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M355,144 C356.104569,144 357,144.895431 357,146 C357,147.104569 356.104569,148 355,148 C353.895431,148 353,147.104569 353,146 C353,144.895431 353.895431,144 355,144 Z M382,144 C383.104569,144 384,144.895431 384,146 C384,147.104569 383.104569,148 382,148 C380.895431,148 380,147.104569 380,146 C380,144.895431 380.895431,144 382,144 Z M412,144 C413.104569,144 414,144.895431 414,146 C414,147.104569 413.104569,148 412,148 C410.895431,148 410,147.104569 410,146 C410,144.895431 410.895431,144 412,144 Z M442,144 C443.104569,144 444,144.895431 444,146 C444,147.104569 443.104569,148 442,148 C440.895431,148 440,147.104569 440,146 C440,144.895431 440.895431,144 442,144 Z M472,144 C473.104569,144 474,144.895431 474,146 C474,147.104569 473.104569,148 472,148 C470.895431,148 470,147.104569 470,146 C470,144.895431 470.895431,144 472,144 Z M499,144 C500.104569,144 501,144.895431 501,146 C501,147.104569 500.104569,148 499,148 C497.895431,148 497,147.104569 497,146 C497,144.895431 497.895431,144 499,144 Z M355,117 C356.104569,117 357,117.895431 357,119 C357,120.104569 356.104569,121 355,121 C353.895431,121 353,120.104569 353,119 C353,117.895431 353.895431,117 355,117 Z M382,117 C383.104569,117 384,117.895431 384,119 C384,120.104569 383.104569,121 382,121 C380.895431,121 380,120.104569 380,119 C380,117.895431 380.895431,117 382,117 Z M412,117 C413.104569,117 414,117.895431 414,119 C414,120.104569 413.104569,121 412,121 C410.895431,121 410,120.104569 410,119 C410,117.895431 410.895431,117 412,117 Z M442,117 C443.104569,117 444,117.895431 444,119 C444,120.104569 443.104569,121 442,121 C440.895431,121 440,120.104569 440,119 C440,117.895431 440.895431,117 442,117 Z M472,117 C473.104569,117 474,117.895431 474,119 C474,120.104569 473.104569,121 472,121 C470.895431,121 470,120.104569 470,119 C470,117.895431 470.895431,117 472,117 Z M499,117 C500.104569,117 501,117.895431 501,119 C501,120.104569 500.104569,121 499,121 C497.895431,121 497,120.104569 497,119 C497,117.895431 497.895431,117 499,117 Z M355,87 C356.104569,87 357,87.8954305 357,89 C357,90.1045695 356.104569,91 355,91 C353.895431,91 353,90.1045695 353,89 C353,87.8954305 353.895431,87 355,87 Z M382,87 C383.104569,87 384,87.8954305 384,89 C384,90.1045695 383.104569,91 382,91 C380.895431,91 380,90.1045695 380,89 C380,87.8954305 380.895431,87 382,87 Z M412,87 C413.104569,87 414,87.8954305 414,89 C414,90.1045695 413.104569,91 412,91 C410.895431,91 410,90.1045695 410,89 C410,87.8954305 410.895431,87 412,87 Z M442,87 C443.104569,87 444,87.8954305 444,89 C444,90.1045695 443.104569,91 442,91 C440.895431,91 440,90.1045695 440,89 C440,87.8954305 440.895431,87 442,87 Z M472,87 C473.104569,87 474,87.8954305 474,89 C474,90.1045695 473.104569,91 472,91 C470.895431,91 470,90.1045695 470,89 C470,87.8954305 470.895431,87 472,87 Z M499,87 C500.104569,87 501,87.8954305 501,89 C501,90.1045695 500.104569,91 499,91 C497.895431,91 497,90.1045695 497,89 C497,87.8954305 497.895431,87 499,87 Z M355,57 C356.104569,57 357,57.8954305 357,59 C357,60.1045695 356.104569,61 355,61 C353.895431,61 353,60.1045695 353,59 C353,57.8954305 353.895431,57 355,57 Z M472,57 C473.104569,57 474,57.8954305 474,59 C474,60.1045695 473.104569,61 472,61 C470.895431,61 470,60.1045695 470,59 C470,57.8954305 470.895431,57 472,57 Z M412,57 C413.104569,57 414,57.8954305 414,59 C414,60.1045695 413.104569,61 412,61 C410.895431,61 410,60.1045695 410,59 C410,57.8954305 410.895431,57 412,57 Z M499,57 C500.104569,57 501,57.8954305 501,59 C501,60.1045695 500.104569,61 499,61 C497.895431,61 497,60.1045695 497,59 C497,57.8954305 497.895431,57 499,57 Z M382,57 C383.104569,57 384,57.8954305 384,59 C384,60.1045695 383.104569,61 382,61 C380.895431,61 380,60.1045695 380,59 C380,57.8954305 380.895431,57 382,57 Z M442,57 C443.104569,57 444,57.8954305 444,59 C444,60.1045695 443.104569,61 442,61 C440.895431,61 440,60.1045695 440,59 C440,57.8954305 440.895431,57 442,57 Z M355,27 C356.104569,27 357,27.8954305 357,29 C357,30.1045695 356.104569,31 355,31 C353.895431,31 353,30.1045695 353,29 C353,27.8954305 353.895431,27 355,27 Z M382,27 C383.104569,27 384,27.8954305 384,29 C384,30.1045695 383.104569,31 382,31 C380.895431,31 380,30.1045695 380,29 C380,27.8954305 380.895431,27 382,27 Z M412,27 C413.104569,27 414,27.8954305 414,29 C414,30.1045695 413.104569,31 412,31 C410.895431,31 410,30.1045695 410,29 C410,27.8954305 410.895431,27 412,27 Z M442,27 C443.104569,27 444,27.8954305 444,29 C444,30.1045695 443.104569,31 442,31 C440.895431,31 440,30.1045695 440,29 C440,27.8954305 440.895431,27 442,27 Z M472,27 C473.104569,27 474,27.8954305 474,29 C474,30.1045695 473.104569,31 472,31 C470.895431,31 470,30.1045695 470,29 C470,27.8954305 470.895431,27 472,27 Z M499,27 C500.104569,27 501,27.8954305 501,29 C501,30.1045695 500.104569,31 499,31 C497.895431,31 497,30.1045695 497,29 C497,27.8954305 497.895431,27 499,27 Z M355,0 C356.104569,0 357,0.8954305 357,2 C357,3.1045695 356.104569,4 355,4 C353.895431,4 353,3.1045695 353,2 C353,0.8954305 353.895431,0 355,0 Z M382,0 C383.104569,0 384,0.8954305 384,2 C384,3.1045695 383.104569,4 382,4 C380.895431,4 380,3.1045695 380,2 C380,0.8954305 380.895431,0 382,0 Z M412,0 C413.104569,0 414,0.8954305 414,2 C414,3.1045695 413.104569,4 412,4 C410.895431,4 410,3.1045695 410,2 C410,0.8954305 410.895431,0 412,0 Z M442,0 C443.104569,0 444,0.8954305 444,2 C444,3.1045695 443.104569,4 442,4 C440.895431,4 440,3.1045695 440,2 C440,0.8954305 440.895431,0 442,0 Z M472,0 C473.104569,0 474,0.8954305 474,2 C474,3.1045695 473.104569,4 472,4 C470.895431,4 470,3.1045695 470,2 C470,0.8954305 470.895431,0 472,0 Z M499,0 C500.104569,0 501,0.8954305 501,2 C501,3.1045695 500.104569,4 499,4 C497.895431,4 497,3.1045695 497,2 C497,0.8954305 497.895431,0 499,0 Z' id='path-1'%3E%3C/path%3E%3C/defs%3E%3Cg id='📝-Pages' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Login---V2' transform='translate(-822.000000, -197.000000)'%3E%3Cg id='top-illustration' transform='translate(469.000000, 197.000000)'%3E%3Cuse fill='%23696cff' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill-opacity='0.6' fill='%23FFFFFF' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
					alt=""
					class="absolute top-0 right-0 transform translate-x-[30%] -translate-y-[40%]"
				/>
				<img
					src="data:image/svg+xml,%3Csvg width='243px' height='240px' viewBox='0 0 243 240' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M34.5,182 C35.8807119,182 37,183.119288 37,184.5 C37,185.880712 35.8807119,187 34.5,187 C33.1192881,187 32,185.880712 32,184.5 C32,183.119288 33.1192881,182 34.5,182 Z M61.5,182 C62.8807119,182 64,183.119288 64,184.5 C64,185.880712 62.8807119,187 61.5,187 C60.1192881,187 59,185.880712 59,184.5 C59,183.119288 60.1192881,182 61.5,182 Z M91.5,182 C92.8807119,182 94,183.119288 94,184.5 C94,185.880712 92.8807119,187 91.5,187 C90.1192881,187 89,185.880712 89,184.5 C89,183.119288 90.1192881,182 91.5,182 Z M123.5,182 C124.880712,182 126,183.119288 126,184.5 C126,185.880712 124.880712,187 123.5,187 C122.119288,187 121,185.880712 121,184.5 C121,183.119288 122.119288,182 123.5,182 Z M153.5,182 C154.880712,182 156,183.119288 156,184.5 C156,185.880712 154.880712,187 153.5,187 C152.119288,187 151,185.880712 151,184.5 C151,183.119288 152.119288,182 153.5,182 Z M180.5,182 C181.880712,182 183,183.119288 183,184.5 C183,185.880712 181.880712,187 180.5,187 C179.119288,187 178,185.880712 178,184.5 C178,183.119288 179.119288,182 180.5,182 Z M34.5,154 C35.8807119,154 37,155.119288 37,156.5 C37,157.880712 35.8807119,159 34.5,159 C33.1192881,159 32,157.880712 32,156.5 C32,155.119288 33.1192881,154 34.5,154 Z M61.5,154 C62.8807119,154 64,155.119288 64,156.5 C64,157.880712 62.8807119,159 61.5,159 C60.1192881,159 59,157.880712 59,156.5 C59,155.119288 60.1192881,154 61.5,154 Z M91.5,154 C92.8807119,154 94,155.119288 94,156.5 C94,157.880712 92.8807119,159 91.5,159 C90.1192881,159 89,157.880712 89,156.5 C89,155.119288 90.1192881,154 91.5,154 Z M123.5,154 C124.880712,154 126,155.119288 126,156.5 C126,157.880712 124.880712,159 123.5,159 C122.119288,159 121,157.880712 121,156.5 C121,155.119288 122.119288,154 123.5,154 Z M153.5,154 C154.880712,154 156,155.119288 156,156.5 C156,157.880712 154.880712,159 153.5,159 C152.119288,159 151,157.880712 151,156.5 C151,155.119288 152.119288,154 153.5,154 Z M180.5,154 C181.880712,154 183,155.119288 183,156.5 C183,157.880712 181.880712,159 180.5,159 C179.119288,159 178,157.880712 178,156.5 C178,155.119288 179.119288,154 180.5,154 Z M34.5,124 C35.8807119,124 37,125.119288 37,126.5 C37,127.880712 35.8807119,129 34.5,129 C33.1192881,129 32,127.880712 32,126.5 C32,125.119288 33.1192881,124 34.5,124 Z M61.5,124 C62.8807119,124 64,125.119288 64,126.5 C64,127.880712 62.8807119,129 61.5,129 C60.1192881,129 59,127.880712 59,126.5 C59,125.119288 60.1192881,124 61.5,124 Z M91.5,124 C92.8807119,124 94,125.119288 94,126.5 C94,127.880712 92.8807119,129 91.5,129 C90.1192881,129 89,127.880712 89,126.5 C89,125.119288 90.1192881,124 91.5,124 Z M123.5,124 C124.880712,124 126,125.119288 126,126.5 C126,127.880712 124.880712,129 123.5,129 C122.119288,129 121,127.880712 121,126.5 C121,125.119288 122.119288,124 123.5,124 Z M153.5,124 C154.880712,124 156,125.119288 156,126.5 C156,127.880712 154.880712,129 153.5,129 C152.119288,129 151,127.880712 151,126.5 C151,125.119288 152.119288,124 153.5,124 Z M180.5,124 C181.880712,124 183,125.119288 183,126.5 C183,127.880712 181.880712,129 180.5,129 C179.119288,129 178,127.880712 178,126.5 C178,125.119288 179.119288,124 180.5,124 Z M34.5,94 C35.8807119,94 37,95.1192881 37,96.5 C37,97.8807119 35.8807119,99 34.5,99 C33.1192881,99 32,97.8807119 32,96.5 C32,95.1192881 33.1192881,94 34.5,94 Z M153.5,94 C154.880712,94 156,95.1192881 156,96.5 C156,97.8807119 154.880712,99 153.5,99 C152.119288,99 151,97.8807119 151,96.5 C151,95.1192881 152.119288,94 153.5,94 Z M91.5,94 C92.8807119,94 94,95.1192881 94,96.5 C94,97.8807119 92.8807119,99 91.5,99 C90.1192881,99 89,97.8807119 89,96.5 C89,95.1192881 90.1192881,94 91.5,94 Z M180.5,94 C181.880712,94 183,95.1192881 183,96.5 C183,97.8807119 181.880712,99 180.5,99 C179.119288,99 178,97.8807119 178,96.5 C178,95.1192881 179.119288,94 180.5,94 Z M61.5,94 C62.8807119,94 64,95.1192881 64,96.5 C64,97.8807119 62.8807119,99 61.5,99 C60.1192881,99 59,97.8807119 59,96.5 C59,95.1192881 60.1192881,94 61.5,94 Z M123.5,94 C124.880712,94 126,95.1192881 126,96.5 C126,97.8807119 124.880712,99 123.5,99 C122.119288,99 121,97.8807119 121,96.5 C121,95.1192881 122.119288,94 123.5,94 Z M34.5,64 C35.8807119,64 37,65.1192881 37,66.5 C37,67.8807119 35.8807119,69 34.5,69 C33.1192881,69 32,67.8807119 32,66.5 C32,65.1192881 33.1192881,64 34.5,64 Z M61.5,64 C62.8807119,64 64,65.1192881 64,66.5 C64,67.8807119 62.8807119,69 61.5,69 C60.1192881,69 59,67.8807119 59,66.5 C59,65.1192881 60.1192881,64 61.5,64 Z M91.5,64 C92.8807119,64 94,65.1192881 94,66.5 C94,67.8807119 92.8807119,69 91.5,69 C90.1192881,69 89,67.8807119 89,66.5 C89,65.1192881 90.1192881,64 91.5,64 Z M123.5,64 C124.880712,64 126,65.1192881 126,66.5 C126,67.8807119 124.880712,69 123.5,69 C122.119288,69 121,67.8807119 121,66.5 C121,65.1192881 122.119288,64 123.5,64 Z M153.5,64 C154.880712,64 156,65.1192881 156,66.5 C156,67.8807119 154.880712,69 153.5,69 C152.119288,69 151,67.8807119 151,66.5 C151,65.1192881 152.119288,64 153.5,64 Z M180.5,64 C181.880712,64 183,65.1192881 183,66.5 C183,67.8807119 181.880712,69 180.5,69 C179.119288,69 178,67.8807119 178,66.5 C178,65.1192881 179.119288,64 180.5,64 Z M34.5,37 C35.8807119,37 37,38.1192881 37,39.5 C37,40.8807119 35.8807119,42 34.5,42 C33.1192881,42 32,40.8807119 32,39.5 C32,38.1192881 33.1192881,37 34.5,37 Z M61.5,37 C62.8807119,37 64,38.1192881 64,39.5 C64,40.8807119 62.8807119,42 61.5,42 C60.1192881,42 59,40.8807119 59,39.5 C59,38.1192881 60.1192881,37 61.5,37 Z M91.5,37 C92.8807119,37 94,38.1192881 94,39.5 C94,40.8807119 92.8807119,42 91.5,42 C90.1192881,42 89,40.8807119 89,39.5 C89,38.1192881 90.1192881,37 91.5,37 Z M123.5,37 C124.880712,37 126,38.1192881 126,39.5 C126,40.8807119 124.880712,42 123.5,42 C122.119288,42 121,40.8807119 121,39.5 C121,38.1192881 122.119288,37 123.5,37 Z M153.5,37 C154.880712,37 156,38.1192881 156,39.5 C156,40.8807119 154.880712,42 153.5,42 C152.119288,42 151,40.8807119 151,39.5 C151,38.1192881 152.119288,37 153.5,37 Z M180.5,37 C181.880712,37 183,38.1192881 183,39.5 C183,40.8807119 181.880712,42 180.5,42 C179.119288,42 178,40.8807119 178,39.5 C178,38.1192881 179.119288,37 180.5,37 Z' id='path-1'%3E%3C/path%3E%3C/defs%3E%3Cg id='📝-Pages' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Login---V2' transform='translate(-469.000000, -670.000000)'%3E%3Cg id='Shapes' transform='translate(469.000000, 197.000000)'%3E%3Cg id='bottom-illustration' transform='translate(0.000000, 473.000000)'%3E%3Crect id='Rectangle' fill='%23696cff' opacity='0.04' x='0' y='0' width='215' height='216' rx='10'%3E%3C/rect%3E%3Crect id='Rectangle' stroke='rgba(67, 89, 113, 0.5)' opacity='0.48' x='104.5' y='100.5' width='138' height='139' rx='10'%3E%3C/rect%3E%3Cg id='Dot'%3E%3Cuse fill='%23696cff' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill-opacity='0.6' fill='%23FFFFFF' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
					alt=""
					class="absolute bottom-0 left-0 transform -translate-x-[30%] translate-y-[40%]"
				/>
				<div class="relative">
					<Card>
						<div class="py-7">
							<div class="text-xl font-semibold mb-5 pb-5 border-b">Login</div>
							<Input
								label="Username"
								placeholder="Masukkan Username"
								value={req().username}
								onInput={(e: any) => handleReq('username', e.target.value)}
							></Input>
							<Input
								type="password"
								label="Password"
								placeholder="*******"
								value={req().password}
								onInput={(e: any) => handleReq('password', e.target.value)}
							></Input>
							<div class="mt-20">
								<Button type="submit" variant="primary" style={{ width: '100%' }}>
									MASUK
								</Button>
							</div>
						</div>
					</Card>
					<div class="text-center">
						<Footer></Footer>
					</div>
				</div>
			</form>
		</main>
	);
}

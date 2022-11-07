import { NavLink } from '@solidjs/router';
import { FaSolidHouse } from 'solid-icons/fa';
import {
	createEffect,
	createSignal,
	For,
	Match,
	onMount,
	Show,
	splitProps,
	Switch,
} from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
	return <div class="bg-white rounded-lg shadow p-5 mb-5">{props.children}</div>;
}

export function Table(
	props: JSX.HTMLAttributes<HTMLTableElement> & {
		headers: any[];
		items?: any[][];
	},
) {
	return (
		<div class="overflow-x-auto">
			<table class="border-collapse w-full whitespace-nowrap">
				<thead>
					<tr>
						<For each={props.headers}>
							{(item) => (
								<th class="text-left uppercase font-semibold border-b border-t border-gray-100 px-3 py-4 text-xs">
									{item}
								</th>
							)}
						</For>
					</tr>
				</thead>
				<tbody>
					<For
						each={props.items}
						fallback={
							<tr>
								<td colspan={props.headers.length} class="text-center p-3 py-4 border-gray-100">
									data tidak tersedia
								</td>
							</tr>
						}
					>
						{(item) => (
							<tr class="transition hover:bg-gray-50">
								<For each={item}>{(key) => <td class="p-3 py-4 border-gray-100">{key}</td>}</For>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}

export function Button(
	props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant: 'primary' | 'danger';
		icon?: any;
	},
) {
	const [{ variant, icon, children }, other] = splitProps(props, ['variant', 'icon', 'children']);

	const bgColor = {
		primary: 'bg-primary',
		danger: 'bg-red-500',
	};

	return (
		<button
			type="button"
			class={`px-5 p-2 rounded shadow text-white transition hover:bg-opacity-80 ${bgColor[variant]}`}
			{...other}
		>
			<Switch fallback={children}>
				<Match when={icon}>
					<div class="flex items-center">
						{icon}
						<div class="mr-2"></div>
						{children}
					</div>
				</Match>
			</Switch>
		</button>
	);
}

export function Modal(
	props: JSX.HTMLAttributes<HTMLDivElement> & {
		model: [Function, Function];
		width?: string;
	},
) {
	const [val, setVal] = props.model;

	let el: any;

	function handleClick(e: any) {
		if (e.path.indexOf(el) < 0) {
			setVal(false);
		}
	}

	return (
		<Show when={val()}>
			<div
				class="z-50 fixed top-0 modal left-0 right-0 bottom-0 bg-black bg-opacity-25 flex lg:items-center items-end justify-center lg:p-5"
				onClick={handleClick}
			>
				<div
					class={`bg-white lg:rounded rounded-t-lg shadow p-5 lg:max-h-full max-h-[80%] overflow-y-auto ${
						props.width ? props.width : 'lg:w-550px'
					} lg:w-550px w-full relative`}
					ref={el}
				>
					{props.children}
				</div>
			</div>
		</Show>
	);
}

export function Input(
	props: JSX.InputHTMLAttributes<HTMLInputElement> & {
		label?: string;
	},
) {
	const [{ label }, other] = splitProps(props, ['label']);

	return (
		<div class="mb-3">
			<Show when={label}>
				<span class="mb-1">{label}</span>
			</Show>
			<input
				class="w-full p-2 px-3 min-h-11 rounded border border-gray-100 transition focus:(border-indigo-500 ring-2 ring-indigo-200)"
				{...other}
			/>
		</div>
	);
}

export function Textarea(
	props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label?: string;
	},
) {
	const [{ label }, other] = splitProps(props, ['label']);

	return (
		<div class="mb-3">
			<Show when={label}>
				<span class="mb-1">{label}</span>
			</Show>
			<textarea
				class="w-full p-2 px-3 min-h-11 rounded border border-gray-100 transition focus:(border-indigo-500 ring-2 ring-indigo-200) resize-none"
				rows={3}
				{...other}
			></textarea>
		</div>
	);
}

export function Select(
	props: JSX.SelectHTMLAttributes<HTMLSelectElement> & {
		label?: string;
		items?: Array<{
			value: string | number;
			text: string;
		}>;
	},
) {
	const [{ label, items }, other] = splitProps(props, ['label', 'items']);

	return (
		<div class="mb-3">
			<Show when={label}>
				<span class="mb-1">{label}</span>
			</Show>
			<select
				class="w-full p-2 px-3 min-h-11 rounded border border-gray-100 transition focus:(border-indigo-500 ring-2 ring-indigo-200)"
				{...other}
			>
				{props.children ? (
					props.children
				) : (
					<For each={items}>{(item) => <option value={item.value}>{item.text}</option>}</For>
				)}
			</select>
		</div>
	);
}

export function Loading() {
	return (
		<div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-5 rounded">
			<div class="bg-white rounded px-5 p-2 shadow text-primary">Memuat...</div>
		</div>
	);
}

export function Header(props: JSX.HTMLAttributes<HTMLDivElement>) {
	return (
		<div class="mb-5 text-2xl flex items-center px-4">
			<NavLink href="/" class="flex items-center">
				<FaSolidHouse class="fill-primary" />
			</NavLink>
			<div class="mx-4">/</div>
			<div>{props.children}</div>
		</div>
	);
}

export function Footer() {
	return (
		<>
			&copy;{' '}
			<a href="google.navigation:q=Gumukmas" target="_blank" class="text-primary">
				PT. Mubarok Intermediatama
			</a>{' '}
			2022
		</>
	);
}

export function Map(
	props: JSX.HTMLAttributes<HTMLDivElement> & {
		id: string;
		marker: any;
		click?: boolean;
	},
) {
	const [marker, setMarker] = createSignal<any>(null);

	const tiles = [
		{
			name: 'Earth',
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
		},
		{
			name: 'Street',
			url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
		},
	];

	function handleMarker(map: any, latlng: any) {
		if (marker()) {
			marker().remove();
		}

		const mark = L.circle(latlng, { radius: 50 }).addTo(map);
		console.log(latlng);
		setMarker(mark);
	}

	onMount(() => {
		const tileLayers: L.Layer[] = [];
		const baseMaps: any = {};

		tiles.forEach((item) => {
			const tileLayer = L.tileLayer(item.url);
			tileLayers.push(tileLayer);
			baseMaps[item.name] = tileLayer;
		});

		const map = L.map(props.id, {
			layers: tileLayers,
			center: [-8.168944661731015, 113.70218722640044],
			zoom: 5,
		});

		L.control.layers(baseMaps).addTo(map);

		if (props.marker) {
			handleMarker(map, {
				lat: props.marker[0],
				lng: props.marker[1],
			});

			map.fitBounds(marker().getBounds());
		}

		L.geoJSON(
			JSON.parse(
				'{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[113.702187,-8.168945]}}',
			),
		).addTo(map);

		if (props.click == null ? true : false) {
			map.on('click', (e) => {
				handleMarker(map, e.latlng);
			});
		}

		setTimeout(() => {
			map.invalidateSize();
		}, 400);
	});

	return <div {...props}></div>;
}

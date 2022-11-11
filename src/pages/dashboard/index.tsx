import { createSignal, onMount, Show } from 'solid-js';
import { Card, Loading } from '../../component';

export default function () {
	const [loading, setLoading] = createSignal(true);

	function asetCard(title: string, count: number, color: string) {
		return (
			<Card>
				<div>{title}</div>
				<div class={`text-5xl ${color} mt-5`}>{count}</div>
			</Card>
		);
	}

	onMount(() => {
		setTimeout(() => {
			setLoading(false);
		}, 500);
	});

	return (
		<>
			<div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-5 text-center relative">
				{asetCard('Aset Bangungan', 557, 'text-green-400')}
				{asetCard('Aset Transportasi', 14, 'text-blue-400')}
				{asetCard('Aset Bisnis & Investasi', 160, 'text-lime-400')}
				{asetCard('Aset Kesehatan', 200, 'text-red-400')}
				{asetCard('Aset Pendidikan', 100, 'text-purple-400')}
				{asetCard('Aset ESTEBU', 148, 'text-orange-400')}
				{asetCard('Aset SDM', 725, 'text-teal-400')}
				<Show when={loading()}>
					<Loading />
				</Show>
			</div>
			<Card>
				<div class="text-center flex items-center justify-center">
					<img
						src="https://img.freepik.com/free-vector/developer-activity-concept-illustration_114360-2801.jpg?w=360"
						alt=""
						class="h-300px"
					/>
					<img
						src="https://img.freepik.com/premium-vector/task-list-illustration_251005-474.jpg?w=2000"
						alt=""
						class="h-300px"
					/>
				</div>
			</Card>
		</>
	);
}

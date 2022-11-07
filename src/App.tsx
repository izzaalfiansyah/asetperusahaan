import { Match, Switch } from 'solid-js';
import Admin from './layout/Admin';
import Login from './layout/Login';
import { auth } from './lib';

const isLogin = !!auth.id;

export default function () {
	return (
		<Switch fallback={<Login />}>
			<Match when={isLogin}>
				<Admin />
			</Match>
		</Switch>
	);
}

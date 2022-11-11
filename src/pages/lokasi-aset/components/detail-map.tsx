import { Accessor } from 'solid-js';
import { Map, Modal } from '../../../component';
import { LokasiAset } from '../type';

interface Props {
	modal: [Accessor<boolean>, Function];
	req: [Accessor<LokasiAset>, Function];
}

export default (props: Props) => {
	const [req, setReq] = props.req;

	return (
		<Modal model={props.modal} width="lg:w-900px">
			<div>
				<Map id="map" class="h-500px" click={false} marker={req().lokasi}></Map>
			</div>
		</Modal>
	);
};

import apiConnection from '../../../services/apiCon';

type EventProps = {
	name: string;
	description: string;
	initial_date: string;
	final_date: string;
};

const postEvent = async (data: EventProps) => {
	try {
		const resp = await apiConnection.post('event', data);

		if (resp) {
			return resp.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export default postEvent;

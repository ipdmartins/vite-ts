import apiConnection from '../../../services/apiCon';

const getEvents = async () => {
	try {
		const resp = await apiConnection.get('event');

		if (resp) {
			return resp.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export default getEvents;

import { toast } from 'react-toastify';

const notification = (color: string, message: string) => {
	if (color === 'success') {
		return toast.success(message, { theme: 'colored', toastId: 'successId' });
	} else {
		return toast.error(message, { theme: 'colored', toastId: 'errorId' });
	}
};

export default notification;

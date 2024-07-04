import { useEffect, useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import notification from '../../components/Notifications';
import 'react-datepicker/dist/react-datepicker.css';
import './NewModule.module.css';
import postEvent from './apiDataManager/postEvent';

type ModalProps = {
	openModal: boolean;
	seModalStatus: (_active: boolean) => void;
	updateEventsList: () => void;
};

export default function NewEvent({
	openModal,
	seModalStatus,
	updateEventsList,
}: ModalProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [initialDate, setInitialDate] = useState(new Date());
	const [finalDate, setFinalDate] = useState(new Date());

	const toggle = () => {
		seModalStatus(false);
		setOpen(false);
		setName('');
		setDescription('');
		setInitialDate(new Date());
		setFinalDate(new Date());
	};

	const onChange = (dates: Array<Date | null>) => {
		console.log(dates);

		if (dates[0] !== null) setInitialDate(new Date(dates[0]));
		if (dates[1] !== null) setFinalDate(new Date(dates[1]));
	};

	const handleSubmit = async () => {
		const initial_date = new Date(initialDate).toISOString();
		const final_date = new Date(finalDate).toISOString();

		const data = {
			name,
			description,
			initial_date,
			final_date,
		};

		const response = await postEvent(data);

		if (response) {
			updateEventsList();
			toggle();
		} else {
			notification('error', 'Failed to create new event');
		}
	};

	useEffect(() => {
		if (openModal) {
			setOpen(openModal);
		}
	}, [openModal]);

	return (
		<div>
			<Modal show={open} size="lg" centered>
				<Modal.Header className="newBookingModal">
					<Modal.Title>New Event</Modal.Title>
				</Modal.Header>
				<Form>
					<Modal.Body className="ps-3">
						<Row>
							<Col>
								<Form.Group>
									<Form.Label data-testid="eventNameLbl">Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Type event name"
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col>
								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										placeholder="Write if you have any special requests"
										as="textarea"
										rows={2}
										onChange={(e) => {
											setDescription(e.target.value);
										}}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mt-3">
							<Form.Group>
								<Form.Label>Select Dates</Form.Label>
								<div>
									<DatePicker
										onChange={onChange}
										selected={initialDate}
										startDate={initialDate}
										endDate={finalDate}
										selectsRange
										monthsShown={2}
										inline
									/>
								</div>
							</Form.Group>
						</Row>
					</Modal.Body>
				</Form>
				<Modal.Footer>
					<Button type="button" variant="danger" onClick={() => toggle()}>
						Close
					</Button>
					<Button
						type="button"
						variant="success"
						onClick={() => handleSubmit()}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

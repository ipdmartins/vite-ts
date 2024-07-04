import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Button, Form } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import NewEvent from './NewEvent';
import getEvents from './apiDataManager/getEvents';

type TableProps = {
	name: string;
	description: string;
	initial_date: string;
	final_date: string;
};

export default function Event() {
	const [inputSearch, setInputSearch] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const [dataTableCurrentEvents, setDataTableCurrentEvents] = useState<
		TableProps[]
	>([]);
	const [filterDataTableCurrentEvents, setFilterDataTableCurrentEvents] =
		useState<TableProps[]>([]);

	const changeModalStatus = (status: boolean) => {
		setOpenModal(status);
	};

	const headerColumns: TableColumn<TableProps>[] = [
		{
			name: 'Event',
			sortable: true,
			selector: (row) => row.name || '',
		},
		{
			name: 'Description',
			selector: (row) => row.description || '',
		},
		{
			name: 'Start date',
			sortable: true,
			selector: (row) => new Date(row.initial_date).toLocaleDateString() || '',
		},
		{
			name: 'Final date',
			sortable: true,
			selector: (row) => new Date(row.final_date).toLocaleDateString() || '',
		},
	];

	async function searchByParameter(search: string) {
		const tolowercase = search.toLocaleLowerCase();

		const filter = filterDataTableCurrentEvents.filter((el) => {
			return Object.values(el).some((val) =>
				String(val).toLocaleLowerCase().includes(tolowercase)
			);
		});

		setDataTableCurrentEvents(filter);
	}

	async function searchForEvents() {
		const response = await getEvents();
		if (response) {
			setDataTableCurrentEvents(response);
			setFilterDataTableCurrentEvents(response);
		}
	}

	useEffect(() => {
		searchForEvents();
	}, []);

	return (
		<div className="m-3">
			<h3 className="text-light ms-3 mt-3 mb-3">Events</h3>
			<Row>
				<Col sm={5}>
					<InputGroup>
						<Form.Control
							type="text"
							placeholder="Search for an event"
							value={inputSearch}
							onChange={(e) => {
								searchByParameter(e.target.value);
								setInputSearch(e.target.value);
							}}
						/>
					</InputGroup>
				</Col>
				<Col sm={3}>
					<Button variant="primary" onClick={() => setOpenModal(true)}>
						New Event
					</Button>
				</Col>
			</Row>
			<Row className="mt-3">
				<DataTable
					columns={headerColumns}
					data={dataTableCurrentEvents}
					pointerOnHover
					highlightOnHover
					className="dataTableStyle"
					theme={'dark'}
				/>
			</Row>
			<NewEvent
				openModal={openModal}
				seModalStatus={changeModalStatus}
				updateEventsList={searchForEvents}
			/>
		</div>
	);
}

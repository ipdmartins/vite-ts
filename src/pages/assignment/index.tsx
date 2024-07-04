import apiConnection from '../../services/apiCon';
import React, { useEffect, useState } from 'react';
import { Row, Col, InputGroup, Table, Form } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';

type TableProps = {
	reservation_uuid: string;
	active_purchases: string;
	sum_active_purchases: string;
};

export default function Assignment() {
	const [assignment, setAssignment] = useState([
		{
			id: 0,
			reservation_uuid: '',
			name: '',
		},
	]);
	const [charges, setCharges] = useState([
		{
			special_product_assignment_id: 0,
			active: false,
			amount: 0,
			id: '',
		},
	]);
	const [inputSearch, setInputSearch] = useState('');
	const [dataTableCurrentBookings, setDataTableCurrentBookings] = useState<
		TableProps[]
	>([]);
	const [filterdataTableCurrentBookings, setFilterDataTableCurrentBookings] =
		useState<TableProps[]>([]);

	const listchages = [];

	const headerColumns: TableColumn<TableProps>[] = [
		{
			name: 'Reservation UUID',
			sortable: true,
			selector: (row) => row.reservation_uuid || '',
		},
		{
			name: 'Number of Active Purchases',
			sortable: true,
			selector: (row) => row.active_purchases || '',
		},
		{
			name: 'Sum of Active Charges',
			sortable: true,
			selector: (row) => row.sum_active_purchases || '',
		},
	];

	async function searchForAssignments() {
		try {
			const resp = await apiConnection.get('assignment');

			if (resp) {
				console.log(resp.data);
				setAssignment(resp.data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function searchForCharges() {
		try {
			const resp = await apiConnection.get('charges');

			if (resp) {
				console.log(resp.data);
				setCharges(resp.data);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async function searchByParameter(search: string) {
		const tolowercase = search.toLocaleLowerCase();

		const filter = filterdataTableCurrentBookings.filter((el) => {
			return Object.values(el).some((val) =>
				String(val).toLocaleLowerCase().includes(tolowercase)
			);
		});

		setDataTableCurrentBookings(filter);
	}

	const sumActive = (item: any) => {
		charges.forEach((charge) => {
			if (charge.special_product_assignment_id === item.id) {
				listchages.push(1);
			}
		});
		return listchages.length;
	};

	useEffect(() => {
		searchForAssignments();
		searchForCharges();
	}, []);
	return (
		<div className="m-3">
			<h3 className="text-light ms-3 mt-3 mb-3">Bookings</h3>
			<Row>
				<Col sm={5}>
					<InputGroup>
						<Form.Control
							type="text"
							placeholder="Search for a booking"
							value={inputSearch}
							onChange={(e) => {
								searchByParameter(e.target.value);
								setInputSearch(e.target.value);
							}}
						/>
					</InputGroup>
				</Col>
			</Row>
			<Row className="mt-3">
				<Table>
					<thead>
						<tr>
							<th>Reservation UUID</th>
							<th>Number of Active Purchases</th>
							<th>Sum of Active Charges</th>
						</tr>
					</thead>
					<tbody>
						{assignment.map((item, index) => (
							<tr key={index}>
								<td>{item.reservation_uuid}</td>
								<td>{sumActive(item)}</td>
								<td>{''}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Table>
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Status</th>
							<th>Charge</th>
						</tr>
					</thead>
					<tbody>
						{assignment.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>
									{(() => {
										const charge = charges.find(
											(charge) =>
												charge.special_product_assignment_id === item.id
										);
										return charge ? 'Active' : 'Cancelled';
									})()}
								</td>
								<td>
									{(() => {
										const charge = charges.find(
											(charge) =>
												charge.special_product_assignment_id === item.id
										);
										return charge ? 'Active' : 'Cancelled';
									})()}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				{/* <DataTable
					columns={headerColumns}
					data={dataTableCurrentBookings}
					pointerOnHover
					highlightOnHover
					className="dataTableStyle"
					theme={'dark'}
				/> */}
			</Row>
		</div>
	);
}

'use client';
import GetVisitors from '@/actions/GetVisitors';
import { TVisitor } from '@/types';
import DateToText from '@/utils/DateToText';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect, useState } from 'react';

const Visitors = () => {
	const [visitors, setVisitors] = useState<TVisitor[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await GetVisitors();
			setVisitors(res?.data);
		};
		fetchData();
	}, []);
	return (
		<div>
			<Typography
				variant='h2'
				gutterBottom
				sx={{
					my: 4,
					fontSize: {
						xs: '2.3rem',
						md: '3rem'
					},
					textAlign: 'center'
				}}
			>
				List of all visitor applications
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Departure Date</TableCell>
							<TableCell>Return Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visitors.map((row, i) => (
							<TableRow key={row?.fullName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{i}
								</TableCell>
								<TableCell component='th' scope='row'>
									{row?.fullName}
								</TableCell>
								<TableCell>{row?.email}</TableCell>
								<TableCell>{row?.phone}</TableCell>
								<TableCell>{DateToText(row?.departureDate)}</TableCell>
								<TableCell>{DateToText(row?.returnDate)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Visitors;

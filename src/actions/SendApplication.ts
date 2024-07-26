'use server';
import { FieldValues } from 'react-hook-form';

const SendApplication = async (data: FieldValues) => {
	const res = await fetch('https://visit-mars-backend.vercel.app/api/visitors/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		cache: 'no-store'
	});

	const resData = await res.json();

	return resData;
};

export default SendApplication;

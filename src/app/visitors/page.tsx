'use client';
import GetVisitors from '@/actions/GetVisitors';
import { TVisitor } from '@/types';
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
	return <h1>{visitors.length}</h1>;
};

export default Visitors;

'use server';
import config from '@/lib/config';

const GetVisitors = async () => {
	const res = await fetch(`${config.server_url}/visitors`, {
		cache: 'no-store'
	});
	const resData = await res.json();
	return resData;
};

export default GetVisitors;

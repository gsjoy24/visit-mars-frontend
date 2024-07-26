'use server';
const GetVisitors = async () => {
	const res = await fetch('https://visit-mars-backend.vercel.app/api/visitors', {
		cache: 'no-store'
	});
	const resData = await res.json();
	return resData;
};

export default GetVisitors;

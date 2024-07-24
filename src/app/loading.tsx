import Loader from '@/components/Shared/Loader/Loader';

const Loading = () => {
	return (
		<div className='w-full min-h-[80vh] flex flex-col items-center justify-center gap-10'>
			<Loader />
			<h1 className='text-2xl font-bold text-center'>Have Patience, Loading...</h1>
		</div>
	);
};

export default Loading;

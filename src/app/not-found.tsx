import NotFound from '@/assets/not-found.svg';
import Image from 'next/image';
const NotFoundPage = () => {
	return (
		<div className='flex flex-col gap-10 justify-center items-center py-[50px]'>
			<Image src={NotFound} alt='page not found' width={300} height={300} />
			<h1 className='text-2xl font-bold text-center'>The page you are looking for is not found!</h1>
		</div>
	);
};

export default NotFoundPage;

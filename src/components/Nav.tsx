import Link from 'next/link';

const Nav = () => {
	return (
		<div className='flex justify-between items-center py-3'>
			<h1 className='text-[26px] font-bold'>VMars</h1>

			<div className='flex items-center gap-2'>
				<Link href='/' className='hover:text-blue-500 duration-150'>
					Make Application
				</Link>
				<Link href='/visitors' className='hover:text-blue-500 duration-150'>
					Visitors
				</Link>
			</div>
		</div>
	);
};

export default Nav;

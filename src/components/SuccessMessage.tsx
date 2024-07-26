import Loading from '@/app/loading';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
	loading: boolean;
	res: Record<any, unknown>;
};

const SuccessMessage = ({ loading, res }: Props) => {
	return (
		<Container maxWidth='sm' sx={{ textAlign: 'center', mt: 5 }}>
			{loading ? (
				<Loading />
			) : (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '60vh',
						border: '1px solid #ddd',
						borderRadius: 2,
						p: 3
					}}
				>
					<Typography variant='h4' gutterBottom>
						{res?.success ? 'Success!' : 'Failed!'}
					</Typography>
					<Typography variant='body1' sx={{ mb: 3 }}>
						{res?.success
							? '	Your application has been submitted successfully!'
							: 'Something went wrong! Please try again!'}
					</Typography>
					<Button onClick={() => location.reload()}>{res?.success ? 'Submit another application' : `Try Again`}</Button>
				</Box>
			)}
		</Container>
	);
};

export default SuccessMessage;

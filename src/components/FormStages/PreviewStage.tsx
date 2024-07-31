import SendApplication from '@/actions/SendApplication';
import DateToText from '@/utils/DateToText';
import { Box, Button, Stack, Typography } from '@mui/material';

type Props = {
	allData: any;
	setLoading: (loading: boolean) => void;
	setRes: (res: Record<any, unknown>) => void;
	setActiveStep: (activeStep: number) => void;
};

const PreviewStage = ({ allData, setLoading, setRes, setActiveStep }: Props) => {
	const {
		fullName,
		dateOfBirth,
		nationality,
		email,
		phone,
		departureDate,
		returnDate,
		accommodationPreference,
		specialRequests,
		healthDeclaration,
		emergencyContact,
		medicalConditions
	} = allData;

	const handleSubmit = async () => {
		setLoading(true);
		setActiveStep(4);

		try {
			const res = await SendApplication(allData);
			setRes(res);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Box className='py-5'>
			<Stack
				gap={0.5}
				sx={{
					my: 2
				}}
			>
				<Typography variant='h5' gutterBottom>
					Personal Information
				</Typography>
				<Typography variant='body1'>Full Name: {fullName}</Typography>
				<Typography variant='body1'>Date of Birth: {DateToText(dateOfBirth)}</Typography>
				<Typography variant='body1'>National of Birth: {nationality}</Typography>
				<Typography variant='body1'>Email: {email}</Typography>
				<Typography variant='body1'>Phone: {phone}</Typography>

				<Typography variant='h5' gutterBottom mt={3}>
					Travel Preferences
				</Typography>
				<Typography variant='body1'>Departure Date: {DateToText(departureDate)}</Typography>
				<Typography variant='body1'>Return Date: {DateToText(returnDate)}</Typography>
				<Typography variant='body1'>Accommodation Preference: {accommodationPreference}</Typography>
				<Typography variant='body1'>Special Requests: {specialRequests}</Typography>

				<Typography variant='h5' gutterBottom mt={3}>
					Health and Safety
				</Typography>
				<Typography variant='body1'>Health Declaration: {healthDeclaration}</Typography>
				<Typography variant='body1'>Emergency Contact: {emergencyContact}</Typography>
				{medicalConditions.length > 0 && (
					<Typography variant='body1'>Medical Conditions: {medicalConditions}</Typography>
				)}
			</Stack>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					pt: 2
				}}
			>
				<Button color='inherit' onClick={() => setActiveStep(2)} sx={{ mr: 1 }}>
					Back
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				<Button onClick={handleSubmit}>Submit</Button>
			</Box>
		</Box>
	);
};

export default PreviewStage;

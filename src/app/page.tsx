'use client';
import GDatePicker from '@/components/Form/GDatePicker';
import GForm from '@/components/Form/GForm';
import GInput from '@/components/Form/GInput';
import { PersonalInfoValidation } from '@/schemas';
import { TVisitor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

const steps = ['Personal Information', 'Travel Preferences', 'Health and Safety'];

const Home = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
	const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);
	const [personalInfo, setPersonalInfo] = useState<Partial<TVisitor>>({});
	const [travelPreferences, setTravelPreferences] = useState<Partial<TVisitor>>({});

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handlePersonalInfo = (data: FieldValues) => {
		setPersonalInfo(data);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleTravelPreferences = (data: FieldValues) => {
		setTravelPreferences(data);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleSubmit = (data: FieldValues) => {
		const combinedData = {
			...personalInfo,
			...travelPreferences,
			...data
		};
		console.log(combinedData);
	};

	return (
		<Container>
			<Typography
				variant='h4'
				gutterBottom
				sx={{
					my: 3
				}}
			>
				Journey to Mars Application Form
			</Typography>

			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};

						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				{activeStep === 0 && (
					<GForm
						onSubmit={handlePersonalInfo}
						resolver={zodResolver(PersonalInfoValidation)}
						styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
					>
						<GInput label='Full Name' name='fullName' />
						<Stack
							direction='row'
							sx={{
								width: '100%',
								gap: 1
							}}
						>
							{/* <GInput label='Date Of Birth' name='dateOfBirth' />
							 */}
							<GDatePicker setDate={setDateOfBirth} setDateError={setDateOfBirthError} dateError={dateOfBirthError} />
							<GInput label='Nationality' name='nationality' />
						</Stack>
						<Stack
							direction='row'
							sx={{
								width: '100%',
								gap: 1
							}}
						>
							<GInput label='Email' name='email' />
							<GInput label='Phone' name='phone' />
						</Stack>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button color='inherit' disabled onClick={handleBack} sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button type='submit'>Next</Button>
						</Box>
					</GForm>
				)}

				{activeStep === 1 && (
					<GForm onSubmit={handleTravelPreferences} styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'>
						<Stack
							direction='row'
							sx={{
								width: '100%',
								gap: 1
							}}
						>
							<GInput label='departureDate' name='departureDate' />
							<GInput label='returnDate' name='returnDate' />
						</Stack>
						<GInput label='accommodationPreference' name='accommodationPreference' multiline />
						<GInput label='accommodationPreference' name='specialRequests' multiline />
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button type='submit'>Next</Button>
						</Box>
					</GForm>
				)}

				{activeStep === 2 && (
					<GForm onSubmit={handleSubmit} styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'>
						<GInput label='emergencyContact' name='emergencyContact' />
						<GInput label='Health Declaration' name='healthDeclaration' multiline />
						<GInput label='medicalConditions' name='medicalConditions' multiline />
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button type='submit'>Submit</Button>
						</Box>
					</GForm>
				)}

				{/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
					<Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
						Back
					</Button>
					<Box sx={{ flex: '1 1 auto' }} />
					{activeStep === 3 ? (
						<Button type='submit'>Submit</Button>
					) : (
						<Button type='button' onClick={handleNext}>
							Next
						</Button>
					)}
				</Box> */}
			</Box>
		</Container>
	);
};
export default Home;

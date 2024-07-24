'use client';
import GForm from '@/components/Form/GForm';
import GInput from '@/components/Form/GInput';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FieldValues } from 'react-hook-form';

const steps = ['Personal Information', 'Travel Preferences', 'Health and Safety'];

const Home = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = (data: FieldValues) => {
		console.log(data);
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
				<GForm onSubmit={handleSubmit} styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'>
					{activeStep === 0 && (
						<>
							<GInput label='Full Name' name='fullName' />
							<GInput label='Date Of Birth' name='dateOfBirth' />
							<GInput label='Nationality' name='nationality' />
							<GInput label='Email' name='email' />
							<GInput label='Phone' name='phone' />
						</>
					)}
					{activeStep === 1 && (
						<>
							<GInput label='departureDate' name='departureDate' />
							<GInput label='returnDate' name='returnDate' />
							<GInput label='accommodationPreference' name='accommodationPreference' multiline />
							<GInput label='accommodationPreference' name='specialRequests' multiline />
						</>
					)}
					{activeStep === 2 && (
						<>
							<GInput label='emergencyContact' name='emergencyContact' />
							<GInput label='Health Declaration' name='healthDeclaration' multiline />
							<GInput label='medicalConditions' name='medicalConditions' multiline />
						</>
					)}

					{activeStep > steps.length ? (
						<React.Fragment>
							<Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
								<Box sx={{ flex: '1 1 auto' }} />
							</Box>
						</React.Fragment>
					) : (
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleNext} type={activeStep === steps.length ? 'submit' : 'button'}>
								{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
							</Button>
						</Box>
					)}
				</GForm>
			</Box>
		</Container>
	);
};
export default Home;

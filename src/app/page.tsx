'use client';
import GDatePicker from '@/components/Form/GDatePicker';
import GForm from '@/components/Form/GForm';
import GInput from '@/components/Form/GInput';
import GSelect from '@/components/Form/GSelect';
import SuccessMessage from '@/components/SuccessMessage';
import { HealthAndSafetyValidation, PersonalInfoValidation, TravelPreferencesValidation } from '@/schemas';
import { TVisitor } from '@/types';
import DateToString from '@/utils/DateToString';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

const steps = ['Personal Information', 'Travel Preferences', 'Health and Safety'];

const accommodationOptions = [
	{
		label: 'Select',
		value: '0',
		disable: true
	},
	{
		label: 'Space Hotel',
		value: 'Space Hotel'
	},
	{
		label: 'Martian Base',
		value: 'Martian Base'
	}
];
const healthDeclarationOptions = [
	{
		label: 'Select',
		value: '0',
		disable: true
	},
	{
		label: 'Yes',
		value: 'Yes'
	},
	{
		label: 'No',
		value: 'No'
	}
];

const Home = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [loading, isLoading] = useState<boolean>(false);
	const [res, setRes] = useState<Record<any, unknown>>({});
	// dates and errors
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
	const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);

	const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
	const [departureDateError, setDepartureDateError] = useState<string | null>(null);

	const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
	const [returnDateError, setReturnDateError] = useState<string | null>(null);

	const [personalInfo, setPersonalInfo] = useState<Partial<TVisitor>>({});
	const [travelPreferences, setTravelPreferences] = useState<Partial<TVisitor>>({});
	const [healthAndSafetyInfo, setHealthAndSafetyInfo] = useState<Partial<TVisitor>>({});

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handlePersonalInfo = (data: FieldValues) => {
		if (!dateOfBirth) {
			setDateOfBirthError('Please select your birth date!');
			return;
		}
		setPersonalInfo(data);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleTravelPreferences = (data: FieldValues) => {
		if (!departureDate) {
			setDepartureDateError('Please select your departure date!');
			return;
		}
		if (!returnDate) {
			setReturnDateError('Please select your return date!');
			return;
		}
		setTravelPreferences(data);
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleSubmit = async (data: FieldValues) => {
		const dateOfBirthString = DateToString(dateOfBirth);
		const departureDateString = DateToString(departureDate);
		const returnDateString = DateToString(returnDate);

		setHealthAndSafetyInfo(data);
		const combinedData = {
			...personalInfo,
			dateOfBirth: dateOfBirthString,
			...travelPreferences,
			departureDate: departureDateString,
			returnDate: returnDateString,
			...data
		};
		setActiveStep((prevActiveStep) => prevActiveStep + 1);

		try {
			const res = await fetch('https://visit-mars-backend.vercel.app/api/visitors/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(combinedData)
			});
			const data = await res.json();
			setRes(data);
		} catch (error: any) {
			console.log(error);
		}
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

			{activeStep === 3 ? (
				<SuccessMessage loading={loading} res={res} setActiveStep={setActiveStep} />
			) : (
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
							defaultValues={personalInfo}
							styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
						>
							<GInput label='Full Name' name='fullName' />
							<Stack
								direction='row'
								sx={{
									width: '100%',
									gap: 1
								}}
								alignItems='baseline'
							>
								<GDatePicker
									label='Date Of Birth'
									date={dateOfBirth}
									setDate={setDateOfBirth}
									setDateError={setDateOfBirthError}
									dateError={dateOfBirthError}
									disableFuture
								/>
								<GInput label='Nationality' name='nationality' />
							</Stack>
							<Stack
								direction='row'
								sx={{
									width: '100%',
									gap: 1
								}}
							>
								<GInput label='Email' name='email' type='email' />
								<GInput label='Phone' name='phone' type='tel' />
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
						<GForm
							onSubmit={handleTravelPreferences}
							defaultValues={travelPreferences}
							styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
							resolver={zodResolver(TravelPreferencesValidation)}
						>
							<Stack
								direction='row'
								sx={{
									width: '100%',
									gap: 1
								}}
							>
								<GDatePicker
									label='Departure Date'
									date={departureDate}
									setDate={setDepartureDate}
									setDateError={setDepartureDateError}
									dateError={departureDateError}
									disablePast
								/>
								<GDatePicker
									label='Return Date'
									date={returnDate}
									minDate={departureDate as any}
									setDate={setReturnDate}
									setDateError={setReturnDateError}
									dateError={returnDateError}
									disabled={!departureDate}
								/>
							</Stack>

							<GSelect name='accommodationPreference' options={accommodationOptions} label='Accommodation Preference' />
							<GInput label='Special Requests (optional)' name='specialRequests' multiline />

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
						<GForm
							onSubmit={handleSubmit}
							defaultValues={healthAndSafetyInfo}
							resolver={zodResolver(HealthAndSafetyValidation)}
							styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
						>
							<Stack
								direction='row'
								sx={{
									width: '100%',
									gap: 1
								}}
							>
								<GInput label='Emergency Contact' name='emergencyContact' type='tel' />
								<GSelect label='Health Declaration' name='healthDeclaration' options={healthDeclarationOptions} />
							</Stack>

							<GInput label='Medical Conditions (optional)' name='medicalConditions' multiline />
							<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
								<Button color='inherit' onClick={handleBack} sx={{ mr: 1 }}>
									Back
								</Button>
								<Box sx={{ flex: '1 1 auto' }} />
								<Button type='submit'>Submit</Button>
							</Box>
						</GForm>
					)}
				</Box>
			)}
		</Container>
	);
};
export default Home;

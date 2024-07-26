'use client';
import SendApplication from '@/actions/SendApplication';
import FormStep1 from '@/components/FormStages/FormStep1';
import FormStep2 from '@/components/FormStages/FormStep2';
import FormStep3 from '@/components/FormStages/FormStep3';
import SuccessMessage from '@/components/SuccessMessage';
import { TVisitor } from '@/types';
import DateToString from '@/utils/DateToString';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

const steps = ['Personal Information', 'Travel Preferences', 'Health and Safety'];

const Home = () => {
	const [activeStep, setActiveStep] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
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
		setLoading(true);
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
			const res = await SendApplication(combinedData);
			setRes(res);
		} catch (error: any) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Typography
				variant='h2'
				gutterBottom
				sx={{
					my: 4,
					fontSize: {
						xs: '2.3rem',
						md: '3rem'
					},
					textAlign: 'center'
				}}
			>
				Journey to Mars Application Form
			</Typography>

			{activeStep === 3 ? (
				<SuccessMessage loading={loading} res={res} />
			) : (
				<Box sx={{ width: '100%' }}>
					<Stepper activeStep={activeStep} alternativeLabel>
						{steps.map((label) => {
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
						<FormStep1
							dateOfBirth={dateOfBirth}
							dateOfBirthError={dateOfBirthError}
							handleBack={handleBack}
							handlePersonalInfo={handlePersonalInfo}
							personalInfo={personalInfo}
							setDateOfBirth={setDateOfBirth}
							setDateOfBirthError={setDateOfBirthError}
						/>
					)}

					{activeStep === 1 && (
						<FormStep2
							departureDate={departureDate}
							departureDateError={departureDateError}
							handleBack={handleBack}
							handleTravelPreferences={handleTravelPreferences}
							returnDate={returnDate}
							returnDateError={returnDateError}
							setDepartureDate={setDepartureDate}
							setDepartureDateError={setDepartureDateError}
							setReturnDate={setReturnDate}
							setReturnDateError={setReturnDateError}
							travelPreferences={travelPreferences}
						/>
					)}

					{activeStep === 2 && (
						<FormStep3
							healthAndSafetyInfo={healthAndSafetyInfo}
							handleBack={handleBack}
							handleHealthAndSafetyInfo={handleSubmit}
						/>
					)}
				</Box>
			)}
		</>
	);
};
export default Home;

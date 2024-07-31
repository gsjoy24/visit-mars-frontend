import { TravelPreferencesValidation } from '@/schemas';
import { TVisitor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import GDatePicker from '../Form/GDatePicker';
import GForm from '../Form/GForm';
import GInput from '../Form/GInput';
import GSelect from '../Form/GSelect';

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

type TFormStep2 = {
	travelPreferences: Partial<TVisitor>;
	handleTravelPreferences: (data: Partial<TVisitor>) => void;
	handleBack: () => void;

	departureDate: Dayjs | null;
	setDepartureDate: Dispatch<SetStateAction<Dayjs | null>>;
	departureDateError: string | null;
	setDepartureDateError: Dispatch<SetStateAction<string | null>>;

	returnDate: Dayjs | null;
	setReturnDate: Dispatch<SetStateAction<Dayjs | null>>;
	returnDateError: string | null;
	setReturnDateError: Dispatch<SetStateAction<string | null>>;
};

const FormStep2 = ({
	travelPreferences,
	handleTravelPreferences,
	handleBack,
	departureDate,
	setDepartureDate,
	departureDateError,
	setDepartureDateError,
	returnDate,
	setReturnDate,
	returnDateError,
	setReturnDateError
}: TFormStep2) => {
	return (
		<GForm
			onSubmit={handleTravelPreferences}
			defaultValues={travelPreferences}
			styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
			resolver={zodResolver(TravelPreferencesValidation)}
		>
			<Stack
				direction={{
					xs: 'column',
					md: 'row'
				}}
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
					minDate={departureDate ?? undefined}
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
	);
};

export default FormStep2;

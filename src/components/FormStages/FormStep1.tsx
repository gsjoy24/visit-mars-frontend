import { PersonalInfoValidation } from '@/schemas';
import { TVisitor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import GDatePicker from '../Form/GDatePicker';
import GForm from '../Form/GForm';
import GInput from '../Form/GInput';

type TFormStep1 = {
	personalInfo: Partial<TVisitor>;
	handlePersonalInfo: (data: Partial<TVisitor>) => void;

	dateOfBirth: Dayjs | null;
	setDateOfBirth: Dispatch<SetStateAction<Dayjs | null>>;
	dateOfBirthError: string | null;
	setDateOfBirthError: Dispatch<SetStateAction<string | null>>;
};

const FormStep1 = ({
	personalInfo,
	handlePersonalInfo,
	dateOfBirth,
	setDateOfBirth,
	dateOfBirthError,
	setDateOfBirthError
}: TFormStep1) => {
	return (
		<GForm
			onSubmit={handlePersonalInfo}
			resolver={zodResolver(PersonalInfoValidation)}
			defaultValues={personalInfo}
			styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
		>
			<GInput label='Full Name' name='fullName' />
			<Stack
				direction={{
					xs: 'column',
					md: 'row'
				}}
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
				direction={{
					xs: 'column',
					md: 'row'
				}}
				sx={{
					width: '100%',
					gap: 1
				}}
			>
				<GInput label='Email' name='email' type='email' />
				<GInput label='Phone' placeholder='8801*********' name='phone' type='tel' />
			</Stack>
			<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
				<Button disabled sx={{ mr: 1 }}>
					Back
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				<Button type='submit'>Next</Button>
			</Box>
		</GForm>
	);
};

export default FormStep1;

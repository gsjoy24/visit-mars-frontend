import { HealthAndSafetyValidation } from '@/schemas';
import { TVisitor } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import GForm from '../Form/GForm';
import GInput from '../Form/GInput';
import GSelect from '../Form/GSelect';

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

type TFormStep3 = {
	healthAndSafetyInfo: Partial<TVisitor>;
	handleHealthAndSafetyInfo: (data: Partial<TVisitor>) => void;
	handleBack: () => void;
};

const FormStep3 = ({ healthAndSafetyInfo, handleHealthAndSafetyInfo, handleBack }: TFormStep3) => {
	return (
		<GForm
			onSubmit={handleHealthAndSafetyInfo}
			defaultValues={healthAndSafetyInfo}
			resolver={zodResolver(HealthAndSafetyValidation)}
			styleClasses='w-full min-h-[400px] p-5 flex flex-col gap-3'
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
				<GInput label='Emergency Contact' placeholder='8801*********' name='emergencyContact' type='tel' />
				<GSelect label='Health Declaration' name='healthDeclaration' options={healthDeclarationOptions} />
			</Stack>

			<GInput label='Medical Conditions (optional)' name='medicalConditions' multiline />
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
export default FormStep3;

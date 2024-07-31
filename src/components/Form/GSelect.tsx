import { FormControl, FormHelperText, MenuItem, Select, SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';

type GSelectProps = {
	label?: string;
	options: { value: string | number; label: string; disable?: boolean }[];
	name: string;
	sx?: SxProps;
};

const GSelect = ({ label, options, name, sx }: GSelectProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<FormControl sx={sx ? { ...sx } : { width: '100%' }} disabled={!options}>
					<label htmlFor={name} className='text-sm font-medium text-gray-700 mb-2'>
						{label}
					</label>
					<Select
						id='demo-simple-select'
						{...field}
						variant='outlined'
						size='small'
						value={field.value || '0'}
						error={!!error?.message}
					>
						{options?.map((option) => (
							<MenuItem key={option?.value} value={option?.value} disabled={option?.disable}>
								{option?.label}
							</MenuItem>
						))}
					</Select>
					{error?.message && (
						<FormHelperText>
							{
								<span className='flex items-center gap-1 relative right-3 text-red-600'>
									<CiWarning size={16} /> {error?.message}
								</span>
							}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	);
};

export default GSelect;

import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { CiWarning } from 'react-icons/ci';

type GDatePickerProps = {
	setDate: Dispatch<SetStateAction<Dayjs | null>>;
	label?: string;
	dateError?: string | null;
	setDateError: Dispatch<SetStateAction<string | null>>;
};

const GDatePicker = ({ setDate, label, dateError, setDateError }: GDatePickerProps) => {
	return (
		<div className='w-full'>
			<label className='text-sm font-medium text-gray-700'>{label ?? 'Date'}</label>
			<DatePicker
				disableFuture
				onChange={(newValue) => setDate(newValue)}
				slotProps={{
					field: { clearable: true, onClear: () => setDate(null) },
					textField: {
						size: 'small',
						variant: 'outlined',
						helperText: dateError && (
							<span className='flex items-center gap-1 '>
								<CiWarning size={16} /> {dateError}
							</span>
						),

						error: !!dateError,
						onSelect: () => {
							setDateError(null);
						}
					}
				}}
				sx={{
					width: '100%',
					mb: 2
				}}
			/>
		</div>
	);
};

export default GDatePicker;

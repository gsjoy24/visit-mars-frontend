import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { CiWarning } from 'react-icons/ci';

type GDatePickerProps = {
	setDate: Dispatch<SetStateAction<Dayjs | null>>;
	label?: string;
	dateError?: string | null;
	setDateError: Dispatch<SetStateAction<string | null>>;
	date: Dayjs | null;
	minDate?: Dayjs;
	disablePast?: boolean;
	disableFuture?: boolean;
	disabled?: boolean;
};

const GDatePicker = ({
	date,
	setDate,
	minDate,
	label,
	dateError,
	setDateError,
	disablePast,
	disableFuture,
	disabled
}: GDatePickerProps) => {
	return (
		<div className='w-full'>
			<label className='text-sm font-medium text-gray-700'>{label ?? 'Date'}</label>
			<DatePicker
				disabled={disabled}
				minDate={minDate}
				defaultValue={date}
				disablePast={disablePast}
				disableFuture={disableFuture}
				onChange={(newValue) => {
					setDate(newValue);
					setDateError(null);
				}}
				slotProps={{
					field: { clearable: true, onClear: () => setDate(null) },
					textField: {
						size: 'small',
						variant: 'outlined',
						helperText: dateError && (
							<span className='flex items-center gap-1 relative -left-[12px]'>
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
					mt: '5px'
				}}
			/>
		</div>
	);
};

export default GDatePicker;

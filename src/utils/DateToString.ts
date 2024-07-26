import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DateToString = (isoDateString: Dayjs | null): string => {
	if (!isoDateString) return '';
	return dayjs(isoDateString).utc().toISOString();
};

export default DateToString;

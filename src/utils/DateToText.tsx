import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(localizedFormat);

const DateToText = (isoDateString: string): string => {
	return dayjs(isoDateString).utc().format('dddd, MMMM D, YYYY');
};

export default DateToText;

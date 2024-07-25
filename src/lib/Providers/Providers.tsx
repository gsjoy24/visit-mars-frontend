'use client';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from '../theme/theme';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</LocalizationProvider>
	);
};

export default Providers;

import Providers from '@/lib/Providers/Providers';
import { Container } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { roboto } from './fonts';
import './globals.css';

export const metadata: Metadata = {
	title: 'Visit Mars',
	description: 'Multi-Stage Mars Visit Application Form.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<html lang='en'>
				<body className={roboto.className}>
					<AppRouterCacheProvider>
						<Container>{children}</Container>
						<Toaster
							toastOptions={{
								style: { background: '#209CEE', color: '#fff' }
							}}
						/>
					</AppRouterCacheProvider>
				</body>
			</html>
		</Providers>
	);
}

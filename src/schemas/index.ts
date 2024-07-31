import { z } from 'zod';

export const PersonalInfoValidation = z.object({
	fullName: z.string({
		required_error: 'Please enter your name!'
	}),
	nationality: z.string({
		required_error: 'Please enter your nationality!'
	}),
	email: z
		.string({
			required_error: 'Please enter your email!'
		})
		.email({
			message: 'Enter a valid email!'
		}),
	phone: z
		.string({
			required_error: 'Please enter your phone number!'
		})
		.refine(
			(value) => {
				// at least 10 digits and at most 14 digits and only digits are allowed
				const regex = /^(\+?88)?01[0-9]{9}$/;
				return regex.test(value);
			},
			{
				message: 'Enter a valid phone number!'
			}
		)
});

export const TravelPreferencesValidation = z.object({
	accommodationPreference: z.string({
		required_error: 'Please select your accommodation preference!'
	}),
	specialRequests: z.string().optional()
});

export const HealthAndSafetyValidation = z.object({
	healthDeclaration: z.string({
		required_error: 'Please select your health declaration!'
	}),
	emergencyContact: z
		.string({
			required_error: 'Please enter a emergency contact!'
		})
		.refine(
			(value) => {
				const regex = /^(\+?88)?01[0-9]{9}$/;
				return regex.test(value);
			},
			{
				message: 'Enter a valid phone number!'
			}
		),
	medicalConditions: z.string().optional()
});

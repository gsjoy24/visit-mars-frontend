export interface TVisitor {
	fullName: string;
	dateOfBirth: string;
	nationality: string;
	email: string;
	phone: string;

	departureDate: string;
	returnDate: string;
	accommodationPreference: 'Space Hotel' | 'Martian Base';
	specialRequests?: string;

	healthDeclaration: 'Yes' | 'No';
	emergencyContact: string;
	medicalConditions?: string;
}

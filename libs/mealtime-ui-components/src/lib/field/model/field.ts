export type InputValidator = (value: string | number) => string | null;

export interface InputTranslations {
	requiredValidationMessage?: string;

	tooLongMessage?: string;

	tooShortMessage?: string;

	invalidEmailMessage?: string;

	patternMismatchMessage?: string;
}

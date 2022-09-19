export type InputValidator = (value: string | number) => string | null;

export type InputValidationAttributes = {
	required?: boolean; // whether a form field needs to be filled in before the form can be submitted.

	minLength?: number; // the minimum and maximum length of strings that can be entered into a form field.

	maxLength?: number; // the minimum and maximum length of strings that can be entered into a form field.

	min?: number; // the minimum and maximum values of numerical input types

	max?: number; // the minimum and maximum values of numerical input types

	typeCheck?: boolean; // should check for type mismatch

	pattern?: string; // a regular expression that defines a pattern the entered data needs to follow.
};

export interface InputTranslations {
	requiredValidationMessage?: string;

	tooLongMessage?: string;

	tooShortMessage?: string;

	invalidEmailMessage?: string;

	patternMismatchMessage?: string;
}

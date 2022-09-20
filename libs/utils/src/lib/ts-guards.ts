export const nonNullObject = <T extends object>(
	objectToTest: object
): objectToTest is T =>
	Object.values(objectToTest).every((value) => value !== null);

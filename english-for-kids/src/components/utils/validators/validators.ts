export type RequiredValidatorType = typeof required;

export const required = (value: string) => {
  if (value) {
    return undefined;
  }

  return 'Field is required';
};

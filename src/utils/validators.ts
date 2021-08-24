export type FieldValidator = (value: string) => string | undefined;

export const required: FieldValidator = value => {
  if (value) return undefined;
  return 'Field is required';

}

export const maxLength = (max: number): FieldValidator => value => {
  if (value.length > max) return `Max length is ${max}`
  return undefined;
}
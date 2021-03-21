export const inputValidations = (input: number): Record<string, boolean> => ({
  isLessThenOne: input < 0,
  isMoreThanTen: input > 10,
  isNotInteger: !Number.isInteger(input),
});

/**
 * Type guard to check if a value is a valid number
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}
